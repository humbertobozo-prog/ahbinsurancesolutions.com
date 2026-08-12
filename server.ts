import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { getSeoMetadata, rewriteHtmlForSeo } from "./server-seo";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

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

  // API Route for Blog Article Generation
  app.post("/api/generate-blog", async (req, res) => {
    try {
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

  // 301 Permanent Redirect for legacy PNG logo to WebP format
  app.get("/andresbozoofi.png", (req, res) => {
    res.redirect(301, "/andresbozoofi.webp");
  });

  // Vite middleware for dev or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get("*all", async (req, res, next) => {
      try {
        // Skip serving HTML for static files / assets, let next handle it
        if (req.path.includes(".") || req.path.startsWith("/api/")) {
          return next();
        }
        
        let template = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.url, template);
        
        const metadata = getSeoMetadata(req.path);
        const seoHtml = rewriteHtmlForSeo(template, metadata);
        
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(200).send(seoHtml);
      } catch (error) {
        console.error("Vite SEO Pre-render failed, falling back to next():", error);
        next(error);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static assets, disabling automatic serving of index.html for root or directories
    app.use(express.static(distPath, { index: false }));
    
    let indexHtmlContent = "";
    
    app.get("*all", (req, res) => {
      try {
        // Skip serving HTML for static files / assets, let other routes/static handle or return 404
        if (req.path.includes(".") || req.path.startsWith("/api/")) {
          return res.status(404).send("Not found");
        }
        
        if (!indexHtmlContent) {
          indexHtmlContent = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        }
        
        const metadata = getSeoMetadata(req.path);
        const seoHtml = rewriteHtmlForSeo(indexHtmlContent, metadata);
        
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(seoHtml);
      } catch (error) {
        console.error("SEO Pre-render/Rewrite failed, falling back to standard index.html:", error);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
