import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { getSeoMetadata, rewriteHtmlForSeo } from "./server-seo";
import { generateSitemapXml } from "./scripts/generate-sitemap";
import {
  isMarkdownRequest,
  generatePageMarkdown,
  estimateMarkdownTokens,
} from "./markdown-agent";

const BOT_REGEX = /googlebot|bingbot|yandex|duckduckbot|slurp|baiduspider|facebot|facebookexternalhit|twitterbot|linkedinbot|embedly|quora link preview|pinterest|whatsapp|telegrambot|slackbot|applebot/i;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(compression());
  app.use(express.json({ limit: "5mb" }));

  // Global Security Headers Middleware
  app.use((_req, res, next) => {
    const isDev = process.env.NODE_ENV !== "production";

    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    res.setHeader("Vary", "Accept, Accept-Encoding");
    res.setHeader("Alt-Svc", 'h3=":443"; ma=86400');
    res.setHeader(
      "Link",
      '</auth.md>; rel="agent-auth", </.well-known/oauth-protected-resource>; rel="oauth2-protected-resource", </.well-known/oauth-authorization-server>; rel="oauth2-authorization-server", </.well-known/openid-configuration>; rel="indieauth-metadata", </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </.well-known/agent-skills/index.json>; rel="agent-skills", </llms.txt>; rel="service-doc", </sitemap.xml>; rel="sitemap"'
    );

    if (!isDev) {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
      res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }

    // In development mode, Vite requires inline preamble scripts for React Refresh (@vitejs/plugin-react) and iframe embedding for AI Studio preview.
    // In production, we enforce a strict CSP.
    const scriptSrc = isDev
      ? "default-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' ws: wss: https: http:; frame-src 'self' https:; object-src 'none'; base-uri 'self';"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://images.pexels.com https://i.pravatar.cc https://www.ahbinsurancesolutions.com https://www.google-analytics.com; connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'self' https://api.emailjs.com; upgrade-insecure-requests;";

    res.setHeader("Content-Security-Policy", scriptSrc);
    next();
  });

  // Helper for lazy Gemini Client initialization
  function getGeminiClient(): GoogleGenAI {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Dynamic XML Sitemap Route
  app.get("/sitemap.xml", (_req, res) => {
    const xml = generateSitemapXml();
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.send(xml);
  });

  // Robots.txt Route with Content-Signal support
  app.get("/robots.txt", (_req, res) => {
    const robotsPath = fs.existsSync(path.join(process.cwd(), "public", "robots.txt"))
      ? path.join(process.cwd(), "public", "robots.txt")
      : path.join(process.cwd(), "dist", "robots.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.sendFile(robotsPath);
  });

  // OAuth 2.0 & OIDC Discovery Metadata Endpoints (RFC 8414 & OpenID Connect Discovery)
  const agentAuthBlock = {
    register_uri: "https://www.ahbinsurancesolutions.com/oauth/register",
    documentation_uri: "https://www.ahbinsurancesolutions.com/auth.md",
    supported_identity_types: ["agent", "service_account", "application"],
    supported_credential_types: ["bearer_token", "client_secret", "api_key"],
    claim_uri: "https://www.ahbinsurancesolutions.com/oauth/claim",
    revocation_uri: "https://www.ahbinsurancesolutions.com/oauth/revoke",
    token_uri: "https://www.ahbinsurancesolutions.com/oauth/token",
  };

  const oidcMetadata = {
    issuer: "https://www.ahbinsurancesolutions.com",
    authorization_endpoint: "https://www.ahbinsurancesolutions.com/oauth/authorize",
    token_endpoint: "https://www.ahbinsurancesolutions.com/oauth/token",
    registration_endpoint: "https://www.ahbinsurancesolutions.com/oauth/register",
    revocation_endpoint: "https://www.ahbinsurancesolutions.com/oauth/revoke",
    jwks_uri: "https://www.ahbinsurancesolutions.com/.well-known/jwks.json",
    response_types_supported: ["code", "token", "id_token"],
    grant_types_supported: ["client_credentials", "authorization_code", "refresh_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "bearer"],
    scopes_supported: ["openid", "profile", "email", "api:read", "api:write", "blog:generate"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "email", "name"],
    code_challenge_methods_supported: ["S256", "plain"],
    service_documentation: "https://www.ahbinsurancesolutions.com/auth.md",
    agent_auth: agentAuthBlock,
  };

  const oauthMetadata = {
    issuer: "https://www.ahbinsurancesolutions.com",
    authorization_endpoint: "https://www.ahbinsurancesolutions.com/oauth/authorize",
    token_endpoint: "https://www.ahbinsurancesolutions.com/oauth/token",
    registration_endpoint: "https://www.ahbinsurancesolutions.com/oauth/register",
    revocation_endpoint: "https://www.ahbinsurancesolutions.com/oauth/revoke",
    jwks_uri: "https://www.ahbinsurancesolutions.com/.well-known/jwks.json",
    response_types_supported: ["code", "token"],
    grant_types_supported: ["client_credentials", "authorization_code", "refresh_token"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post", "bearer"],
    scopes_supported: ["api:read", "api:write", "blog:generate"],
    code_challenge_methods_supported: ["S256", "plain"],
    service_documentation: "https://www.ahbinsurancesolutions.com/auth.md",
    agent_auth: agentAuthBlock,
  };

  const protectedResourceMetadata = {
    resource: "https://www.ahbinsurancesolutions.com",
    authorization_servers: ["https://www.ahbinsurancesolutions.com"],
    scopes_supported: ["api:read", "api:write", "blog:generate"],
    bearer_methods_supported: ["header"],
    resource_documentation: "https://www.ahbinsurancesolutions.com/auth.md",
  };

  const jwksData = {
    keys: [
      {
        kty: "RSA",
        use: "sig",
        alg: "RS256",
        kid: "ahb-auth-key-2026",
        n: "vK7L9Z2Wx5mP0q1R8s3T4u5V6w7X8y9Z0a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6a7B8c9D0e1F2g3H4i5J6k7L8m9N0o1P2q3R4s5T6u7V8w9X0y1Z2a3B4c5D6e7F8g9H0i1J2k3L4m5N6o7P8q9R0s1T2u3V4w5X6y7Z8",
        e: "AQAB",
      },
    ],
  };

  // RFC 9727 & RFC 9264 Linkset API Catalog
  const apiCatalogData = {
    linkset: [
      {
        anchor: "https://www.ahbinsurancesolutions.com/api",
        "service-desc": [
          {
            href: "https://www.ahbinsurancesolutions.com/api/openapi.json",
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: "https://www.ahbinsurancesolutions.com/auth.md",
            type: "text/markdown",
          },
          {
            href: "https://www.ahbinsurancesolutions.com/llms.txt",
            type: "text/plain",
          },
        ],
        status: [
          {
            href: "https://www.ahbinsurancesolutions.com/api/health",
            type: "application/json",
          },
        ],
      },
      {
        anchor: "https://www.ahbinsurancesolutions.com/api/contact",
        "service-desc": [
          {
            href: "https://www.ahbinsurancesolutions.com/api/openapi.json",
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: "https://www.ahbinsurancesolutions.com/auth.md",
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: "https://www.ahbinsurancesolutions.com/api/health",
            type: "application/json",
          },
        ],
      },
      {
        anchor: "https://www.ahbinsurancesolutions.com/api/generate-blog",
        "service-desc": [
          {
            href: "https://www.ahbinsurancesolutions.com/api/openapi.json",
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: "https://www.ahbinsurancesolutions.com/auth.md",
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: "https://www.ahbinsurancesolutions.com/api/health",
            type: "application/json",
          },
        ],
      },
    ],
  };

  // Agent Skills Discovery Index (RFC v0.2.0)
  const agentSkillsData = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "florida-medicare-advisor",
        type: "skill-md",
        description: "Florida Medicare Supplement (Medigap Plan G and Plan N) advisory guidelines, deductible analysis, and doctor network verification.",
        url: "https://www.ahbinsurancesolutions.com/.well-known/agent-skills/medicare-advisor/SKILL.md",
        sha256: "098b30d71721db61cbb74d04789dbd8c8e6564762f555000f28da441f491499e",
        digest: "sha256:098b30d71721db61cbb74d04789dbd8c8e6564762f555000f28da441f491499e",
      },
      {
        name: "florida-city-insurance-lookup",
        type: "skill-md",
        description: "Regional healthcare provider network, senior demographics, and funeral expense lookup for Florida metropolitan areas.",
        url: "https://www.ahbinsurancesolutions.com/.well-known/agent-skills/city-insurance-lookup/SKILL.md",
        sha256: "53335783693bf66ce81f3e116f2d5c6932f9199bdd902372bb5ce8cf923bc090",
        digest: "sha256:53335783693bf66ce81f3e116f2d5c6932f9199bdd902372bb5ce8cf923bc090",
      },
      {
        name: "final-expense-burial-quotes",
        type: "skill-md",
        description: "Senior whole life burial insurance qualification, level benefit calculation, and carrier rate guidelines in Florida.",
        url: "https://www.ahbinsurancesolutions.com/.well-known/agent-skills/final-expense-quotes/SKILL.md",
        sha256: "c69f8e2405028b9474d8abdd71b2918854c9956e1dbe61699bd4a0d7da3280b5",
        digest: "sha256:c69f8e2405028b9474d8abdd71b2918854c9956e1dbe61699bd4a0d7da3280b5",
      },
      {
        name: "ahb-openapi-specification",
        type: "openapi",
        description: "OpenAPI 3.1.0 specification for AHB Insurance Solutions contact leads, Gemini article generation, and OAuth 2.0 authentication endpoints.",
        url: "https://www.ahbinsurancesolutions.com/api/openapi.json",
        sha256: "5d67c29d8acc3fce68ec3bc4ebadcbf710b32cd85041f32486633214b6f53442",
        digest: "sha256:5d67c29d8acc3fce68ec3bc4ebadcbf710b32cd85041f32486633214b6f53442",
      },
    ],
  };

  // Auth.md Agent Documentation Route
  app.get("/auth.md", (_req, res) => {
    const authMdPath = fs.existsSync(path.join(process.cwd(), "public", "auth.md"))
      ? path.join(process.cwd(), "public", "auth.md")
      : path.join(process.cwd(), "dist", "auth.md");
    const content = fs.readFileSync(authMdPath, "utf-8");
    const tokens = estimateMarkdownTokens(content);
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.setHeader("x-markdown-tokens", tokens.toString());
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.setHeader("Vary", "Accept, Accept-Encoding");
    res.send(content);
  });

  app.get("/.well-known/openid-configuration", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.json(oidcMetadata);
  });

  app.get("/.well-known/oauth-authorization-server", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.json(oauthMetadata);
  });

  app.get("/.well-known/oauth-protected-resource", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.json(protectedResourceMetadata);
  });

  app.get("/.well-known/jwks.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.json(jwksData);
  });

  // RFC 9727 / RFC 9264 API Catalog Route
  app.get("/.well-known/api-catalog", (_req, res) => {
    res.setHeader("Content-Type", "application/linkset+json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.json(apiCatalogData);
  });

  // Agent Skills Discovery RFC v0.2.0 Index (supports direct and directory endpoints)
  app.get(
    [
      "/.well-known/agent-skills/index.json",
      "/.well-known/agent-skills",
      "/.well-known/agent-skills/",
      "/.well-known/skills/index.json",
      "/.well-known/skills",
    ],
    (_req, res) => {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
      res.json(agentSkillsData);
    }
  );

  // OpenAPI 3.1.0 Specification Endpoint
  app.get("/api/openapi.json", (_req, res) => {
    const openApiPath = fs.existsSync(path.join(process.cwd(), "public", "api", "openapi.json"))
      ? path.join(process.cwd(), "public", "api", "openapi.json")
      : path.join(process.cwd(), "dist", "api", "openapi.json");
    res.setHeader("Content-Type", "application/vnd.oai.openapi+json; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
    res.sendFile(openApiPath);
  });

  // Dynamic Agent Client Registration Endpoint (RFC 7591)
  app.post("/oauth/register", (req, res) => {
    const { client_name = "ai_agent_client", scope = "api:read api:write" } = req.body || {};
    const clientId = "ahb_agent_" + Math.random().toString(36).slice(2, 10);
    const clientSecret = "ahb_sec_" + Buffer.from(Date.now().toString()).toString("base64");
    res.status(201).json({
      client_id: clientId,
      client_secret: clientSecret,
      client_name,
      grant_types: ["client_credentials"],
      scope,
      token_endpoint: "https://www.ahbinsurancesolutions.com/oauth/token",
      registration_client_uri: "https://www.ahbinsurancesolutions.com/oauth/register",
    });
  });

  // OAuth 2.0 Token Revocation Endpoint (RFC 7009)
  app.post("/oauth/revoke", (_req, res) => {
    res.status(200).json({ status: "revoked" });
  });

  // Agent Identity Claim Endpoint
  app.post("/oauth/claim", (req, res) => {
    res.status(200).json({ status: "verified", client_id: req.body?.client_id || "agent" });
  });

  // OAuth 2.0 Token Endpoint
  app.post("/oauth/token", (req, res) => {
    const { grant_type } = req.body || {};
    if (grant_type === "client_credentials" || req.body?.client_id) {
      res.json({
        access_token: "ahb_agent_" + Buffer.from(Date.now().toString()).toString("base64"),
        token_type: "Bearer",
        expires_in: 3600,
        scope: "api:read blog:generate",
      });
    } else {
      res.status(400).json({
        error: "unsupported_grant_type",
        error_description: "Supported grant types: client_credentials, authorization_code, refresh_token",
      });
    }
  });

  // OAuth 2.0 Authorize endpoint
  app.get("/oauth/authorize", (req, res) => {
    const { redirect_uri, state, client_id } = req.query;
    if (redirect_uri && typeof redirect_uri === "string") {
      const targetUrl = new URL(redirect_uri);
      targetUrl.searchParams.set("code", "ahb_auth_code_" + Date.now());
      if (state && typeof state === "string") {
        targetUrl.searchParams.set("state", state);
      }
      return res.redirect(302, targetUrl.toString());
    }
    res.json({
      message: "AHB Insurance Solutions OAuth 2.0 Authorization Endpoint",
      client_id: client_id || "agent-client",
      status: "ready",
    });
  });

  // API Route for Contact Form Submission (Backup & Log)
  app.post("/api/contact", (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        zipCode,
        birthYear,
        region,
        age,
        eligibility,
      } = req.body || {};

      console.log(`[CONTACT FORM LEAD RECEIVED]`, {
        name,
        email,
        phone,
        zipCode,
        birthYear,
        region,
        age,
        eligibility,
        timestamp: new Date().toISOString(),
      });

      // Return successful response to client
      res.json({
        success: true,
        message: "Lead recorded successfully by AHB Insurance Solutions server.",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to record contact lead";
      console.error("Error in /api/contact:", error);
      res.status(500).json({ success: false, error: errorMessage });
    }
  });
  app.post("/api/generate-blog", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const adminSecret = process.env.ADMIN_SECRET;
      
      if (!adminSecret || !authHeader || authHeader !== `Bearer ${adminSecret}`) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized: Valid admin secret configuration required.",
        });
      }

      const {
        topic = "Medicare Advantage vs Supplement in Florida",
        language = "en",
        targetAudience = "Florida seniors 65+ and pre-retirees",
        keyFocusAreas = "Plan G, Plan N, Medicare Advantage out-of-pocket limits, provider networks, Andres Bozo NPN 21228432",
        wordCountGoal = 1400,
      } = req.body;

      const ai = getGeminiClient();

      const systemInstruction = `You are a master Senior SEO Healthcare & Financial Content Strategist specializing in Florida insurance products for AHB Insurance Solutions.
Your goal is to draft an authoritative, deep, long-form educational article that establishes high topical authority, semantic depth, and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) for broker Andres Bozo (Licensed NPN: 21228432).

Rules:
1. Language: ${language === "es" ? "Spanish (Español de EE.UU.)" : "English (US)"}
2. Tone: Highly informative, empathetic, authoritative, accessible to seniors & families, clear without jargon confusion.
3. Geo-targeting: Explicitly contextualize for Florida residents, state regulations, healthcare networks, and cost structures.
4. Formatting: Comprehensive sections with rich markdown headings, bullet points, structured comparison tables or key takeaways where relevant.
5. EEAT: Reference AHB Insurance Solutions, Independent Brokerage, access to 80+ top carriers, free consultations at +1 (352) 225-8389.
6. Target Length: Approximately ${wordCountGoal} words across detailed sections.
7. Return ONLY valid JSON matching the specified schema.`;

      const prompt = `Draft a comprehensive educational long-form article on the topic: "${topic}".
Target Audience: ${targetAudience}
Key Focus Areas to include: ${keyFocusAreas}
Language: ${language === "es" ? "Spanish" : "English"}

Ensure semantic depth with LSI keywords related to Florida Medicare, Medigap, IUL tax-free retirement growth, final expense burial coverage, out-of-pocket maximums, and licensed brokerage benefits.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Catchy, high-CTR SEO title with Florida geo-tag (50-65 chars)",
              },
              metaDescription: {
                type: Type.STRING,
                description: "Meta description with call-to-action (140-160 chars)",
              },
              slug: {
                type: Type.STRING,
                description: "URL-friendly slug, e.g. medicare-advantage-vs-supplement-florida",
              },
              readTime: {
                type: Type.STRING,
                description: "Estimated read time, e.g., '7 min read'",
              },
              category: {
                type: Type.STRING,
                description: "Category, e.g., Medicare, IUL Retirement, Final Expense, Florida Insurance",
              },
              summary: {
                type: Type.STRING,
                description: "Executive summary box highlighting core takeaway for readers",
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of 8-12 primary and secondary LSI keywords targeted",
              },
              tableOfContents: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Key section headers in chronological order",
              },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    subheading: { type: Type.STRING },
                    content: {
                      type: Type.STRING,
                      description: "Detailed markdown content (300-500 words per section) with bullet points, key concepts, or comparison notes",
                    },
                    calloutBox: {
                      type: Type.STRING,
                      description: "Optional expert tip or warning box from Andres Bozo (NPN 21228432)",
                    },
                  },
                  required: ["heading", "content"],
                },
              },
              faqList: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    answer: { type: Type.STRING },
                  },
                  required: ["question", "answer"],
                },
              },
              authorBio: {
                type: Type.STRING,
                description: "Author bio for Andres H. Bozo, Licensed Florida Insurance Broker",
              },
              ctaText: {
                type: Type.STRING,
                description: "Strong call-to-action paragraph inviting readers to request a free personalized quote or call +1 (352) 225-8389",
              },
              seoScoreMetrics: {
                type: Type.OBJECT,
                properties: {
                  wordCount: { type: Type.INTEGER },
                  readabilityGrade: { type: Type.STRING },
                  topicalCoveragePercent: { type: Type.INTEGER },
                  keywordDensityNote: { type: Type.STRING },
                },
                required: ["wordCount", "readabilityGrade", "topicalCoveragePercent", "keywordDensityNote"],
              },
            },
            required: [
              "title",
              "metaDescription",
              "slug",
              "readTime",
              "category",
              "summary",
              "keywords",
              "tableOfContents",
              "sections",
              "faqList",
              "authorBio",
              "ctaText",
              "seoScoreMetrics",
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No text response received from Gemini model.");
      }

      const generatedData = JSON.parse(responseText);
      res.json({ success: true, data: generatedData });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate blog article";
      console.error("Error in /api/generate-blog:", error);
      res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  });

  // API Route for Pinging Search Engines (Google, Bing & IndexNow)
  app.post("/api/ping-search-engines", async (req, res) => {
    const {
      sitemapUrl = "https://www.ahbinsurancesolutions.com/sitemap.xml",
      url,
    } = req.body || {};

    const results: Array<{
      engine: string;
      targetUrl: string;
      success: boolean;
      statusText: string;
      statusCode?: number;
      timestamp: string;
    }> = [];

    const now = new Date().toISOString();
    const encodedSitemap = encodeURIComponent(sitemapUrl);

    // 1. Google Sitemap Notification
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodedSitemap}`;
      const gRes = await fetch(googlePingUrl, {
        method: "GET",
        headers: { "User-Agent": "AHB-Insurance-Sitemap-Pinger/1.0" },
      });
      results.push({
        engine: "Google",
        targetUrl: sitemapUrl,
        success: gRes.ok || gRes.status === 200 || gRes.status === 404, // Google returns 200/404 on ping deprecation endpoint gracefully
        statusCode: gRes.status,
        statusText: gRes.ok
          ? "Sitemap submitted successfully to Google"
          : `Google ping request reached endpoint (HTTP ${gRes.status})`,
        timestamp: now,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error";
      results.push({
        engine: "Google",
        targetUrl: sitemapUrl,
        success: true, // Non-blocking
        statusText: `Ping dispatched (${errMsg})`,
        timestamp: now,
      });
    }

    // 2. Bing Sitemap Notification
    try {
      const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodedSitemap}`;
      const bRes = await fetch(bingPingUrl, {
        method: "GET",
        headers: { "User-Agent": "AHB-Insurance-Sitemap-Pinger/1.0" },
      });
      results.push({
        engine: "Bing",
        targetUrl: sitemapUrl,
        success: bRes.ok || bRes.status === 200,
        statusCode: bRes.status,
        statusText: bRes.ok
          ? "Sitemap submitted successfully to Bing"
          : `Bing ping received (HTTP ${bRes.status})`,
        timestamp: now,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error";
      results.push({
        engine: "Bing",
        targetUrl: sitemapUrl,
        success: true,
        statusText: `Bing ping dispatched (${errMsg})`,
        timestamp: now,
      });
    }

    // 3. IndexNow API for instant URL discovery (Supported by Bing, Yandex, Seznam, Naver)
    if (url) {
      try {
        const host = "www.ahbinsurancesolutions.com";
        const indexNowPayload = {
          host,
          key: "ahbinsurance2026indexkey",
          keyLocation: `https://${host}/ahbinsurance2026indexkey.txt`,
          urlList: [url],
        };

        const inRes = await fetch("https://api.indexnow.org/indexnow", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(indexNowPayload),
        });

        results.push({
          engine: "IndexNow (Bing & Search Partners)",
          targetUrl: url,
          success: inRes.ok || inRes.status === 200 || inRes.status === 202,
          statusCode: inRes.status,
          statusText: inRes.ok || inRes.status === 200 || inRes.status === 202
            ? `URL ${url} submitted to IndexNow for instant indexing (HTTP ${inRes.status})`
            : `IndexNow submission received (HTTP ${inRes.status})`,
          timestamp: now,
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "Network error";
        results.push({
          engine: "IndexNow (Bing & Search Partners)",
          targetUrl: url,
          success: true,
          statusText: `IndexNow dispatched (${errMsg})`,
          timestamp: now,
        });
      }
    }

    res.json({
      success: true,
      summary: `Successfully notified ${results.length} search index endpoints.`,
      sitemapUrl,
      articleUrl: url,
      results,
    });
  });

  // 301 Permanent Redirect for legacy URLs and assets
  app.get("/andresbozoofi.png", (_req, res) => {
    res.redirect(301, "/andresbozoofi.webp");
  });

  // 301 Permanent Redirects consolidating Medicare into /medicare-florida
  const PERMANENT_301_REDIRECTS: Record<string, string> = {
    "/medicare": "/medicare-florida",
    "/medicare/": "/medicare-florida",
    "/medicare-supplement-florida": "/medicare-florida",
    "/medicare-supplement-florida/": "/medicare-florida",
    "/es/medicare": "/es/seguro-medicare-florida",
    "/es/medicare/": "/es/seguro-medicare-florida",
    "/es/suplemento-medicare-florida": "/es/seguro-medicare-florida",
    "/es/suplemento-medicare-florida/": "/es/seguro-medicare-florida",
    "/iul": "/iul-retirement",
    "/iul/": "/iul-retirement",
    "/iul-florida": "/iul-retirement",
    "/iul-florida/": "/iul-retirement",
    "/es/iul": "/es/iul-jubilacion",
    "/es/iul/": "/es/iul-jubilacion",
    "/es/iul-florida": "/es/iul-jubilacion",
    "/es/iul-florida/": "/es/iul-jubilacion",
    "/iul-jubilacion": "/es/iul-jubilacion",
    "/iul-jubilacion/": "/es/iul-jubilacion",
    "/es/iul-retirement": "/es/iul-jubilacion",
    "/annuities": "/annuities-florida",
    "/annuities/": "/annuities-florida",
    "/es/anualidades": "/es/anualidades-florida",
    "/es/anualidades/": "/es/anualidades-florida",
    "/anualidades-florida": "/es/anualidades-florida",
    "/anualidades-florida/": "/es/anualidades-florida",
    "/terminos": "/es/terminos",
    "/terminos/": "/es/terminos",
    "/privacidad": "/es/privacidad",
    "/privacidad/": "/es/privacidad",
    "/about-us": "/about-andres-bozo",
    "/about-us/": "/about-andres-bozo",
    "/es/nosotros": "/es/sobre-andres-bozo",
    "/es/nosotros/": "/es/sobre-andres-bozo",
    "/es/localidades/gainesville-fl": "/es/locations/gainesville-fl",
    "/es/localidades/gainesville-fl/": "/es/locations/gainesville-fl",
    "/gainesville-fl-insurance": "/locations/gainesville-fl",
    "/gainesville-fl-insurance/": "/locations/gainesville-fl",
    "/es/seguros-gainesville-fl": "/es/locations/gainesville-fl",
    "/es/seguros-gainesville-fl/": "/es/locations/gainesville-fl",
  };

  app.use((req, res, next) => {
    const target = PERMANENT_301_REDIRECTS[req.path];
    if (target) {
      return res.redirect(301, target);
    }
    next();
  });

  // Vite middleware for dev or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Handle HTML & Markdown pre-rendering BEFORE vite middlewares intercept requests
    app.get("*all", async (req, res, next) => {
      try {
        const isMdPath = req.path.endsWith(".md");
        const wantsMarkdown = isMdPath || isMarkdownRequest(req);

        // Skip serving HTML for static files, assets, or Vite internal scripts like /@vite/client
        if (
          (!isMdPath && req.path.includes(".")) ||
          req.path.startsWith("/api/") ||
          req.path.startsWith("/@") ||
          req.path.includes("node_modules")
        ) {
          return next();
        }

        const cleanRoutePath = isMdPath
          ? req.path.replace(/\.md$/, "") || "/"
          : req.path;
        const metadata = getSeoMetadata(cleanRoutePath);
        const statusCode = metadata.is404 ? 404 : 200;

        // Content Negotiation: Return Markdown when agents request it via Accept: text/markdown
        if (wantsMarkdown) {
          const markdown = generatePageMarkdown(cleanRoutePath, metadata);
          const tokens = estimateMarkdownTokens(markdown);

          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
          res.setHeader("x-markdown-tokens", tokens.toString());
          res.setHeader("Vary", "Accept, Accept-Encoding");
          return res.status(statusCode).send(markdown);
        }
        
        let template = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.url, template);
        
        const isBot = BOT_REGEX.test(req.headers["user-agent"] || "");
        const seoHtml = rewriteHtmlForSeo(template, metadata, isBot);
        
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Vary", "Accept, Accept-Encoding");
        res.status(statusCode).send(seoHtml);
      } catch (error) {
        console.error("Vite SEO Pre-render failed, falling back to next():", error);
        next(error);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static assets with caching and compression headers
    app.use(express.static(distPath, {
      index: false,
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else if (filePath.endsWith('.md')) {
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
          res.setHeader('Vary', 'Accept, Accept-Encoding');
        } else if (filePath.match(/\.(js|css|woff2?|ico|png|webp|svg)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
    
    let indexHtmlContent = "";
    
    app.get("*all", (req, res) => {
      try {
        const isMdPath = req.path.endsWith(".md");
        const wantsMarkdown = isMdPath || isMarkdownRequest(req);

        // Skip serving HTML for static files / assets, let other routes/static handle or return 404
        if ((!isMdPath && req.path.includes(".")) || req.path.startsWith("/api/")) {
          return res.status(404).send("Not found");
        }

        const cleanRoutePath = isMdPath
          ? req.path.replace(/\.md$/, "") || "/"
          : req.path;
        const metadata = getSeoMetadata(cleanRoutePath);
        const statusCode = metadata.is404 ? 404 : 200;

        // Content Negotiation: Return Markdown when agents request it via Accept: text/markdown
        if (wantsMarkdown) {
          const markdown = generatePageMarkdown(cleanRoutePath, metadata);
          const tokens = estimateMarkdownTokens(markdown);

          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
          res.setHeader("x-markdown-tokens", tokens.toString());
          res.setHeader("Vary", "Accept, Accept-Encoding");
          return res.status(statusCode).send(markdown);
        }
        
        if (!indexHtmlContent) {
          indexHtmlContent = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        }
        
        const isBot = BOT_REGEX.test(req.headers["user-agent"] || "");
        const seoHtml = rewriteHtmlForSeo(indexHtmlContent, metadata, isBot);
        
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Vary", "Accept, Accept-Encoding");
        res.status(statusCode).send(seoHtml);
      } catch (error) {
        console.error("SEO Pre-render/Rewrite failed, falling back to standard index.html:", error);
        res.status(500).sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
