# Agent Authentication & Registration Guide (Auth.md)
# AHB Insurance Solutions

> Documentation for autonomous AI agents, LLM applications, and machine clients authenticating with the AHB Insurance Solutions Florida Insurance API ecosystem.

---

## 1. Overview & Discovery Metadata

AHB Insurance Solutions publishes standard OAuth 2.0 and OpenID Connect discovery metadata endpoints:

- **OAuth 2.0 Authorization Server Metadata (RFC 8414):**  
  `https://www.ahbinsurancesolutions.com/.well-known/oauth-authorization-server`
- **OpenID Connect Discovery (OIDC 1.0):**  
  `https://www.ahbinsurancesolutions.com/.well-known/openid-configuration`
- **Protected Resource Metadata (RFC 9728):**  
  `https://www.ahbinsurancesolutions.com/.well-known/oauth-protected-resource`
- **JSON Web Key Set (JWKS - RFC 7517):**  
  `https://www.ahbinsurancesolutions.com/.well-known/jwks.json`
- **Machine API Catalog (RFC 9704):**  
  `https://www.ahbinsurancesolutions.com/.well-known/api-catalog`
- **LLM Context Manifest:**  
  `https://www.ahbinsurancesolutions.com/llms.txt` | `https://www.ahbinsurancesolutions.com/llms-full.txt`

---

## 2. Agent Identity & Credential Types

### Supported Identity Types
- `agent`: Autonomous software agent or LLM acting on behalf of a user or third-party client.
- `service_account`: Backend server-to-server integration.
- `application`: Client application accessing insurance quote and educational services.

### Supported Credential Types
- `bearer_token`: Standard OAuth 2.0 Bearer Token passed via `Authorization: Bearer <token>`.
- `client_secret`: Confidential client credentials provided at dynamic registration.
- `api_key`: Pre-provisioned API key for designated administrative integrations.

---

## 3. Dynamic Agent Client Registration (RFC 7591)

Autonomous agents can register programmatically by sending an HTTP POST request to the registration endpoint:

```http
POST /oauth/register HTTP/1.1
Host: www.ahbinsurancesolutions.com
Content-Type: application/json

{
  "client_name": "MyInsuranceAgent",
  "client_uri": "https://example.com/agent",
  "grant_types": ["client_credentials"],
  "response_types": ["token"],
  "scope": "api:read api:write"
}
```

### Successful Registration Response:
```json
{
  "client_id": "ahb_agent_client_7a9f2e...",
  "client_secret": "ahb_sec_99b1c4...",
  "client_name": "MyInsuranceAgent",
  "grant_types": ["client_credentials"],
  "scope": "api:read api:write",
  "token_endpoint": "https://www.ahbinsurancesolutions.com/oauth/token",
  "registration_client_uri": "https://www.ahbinsurancesolutions.com/oauth/register"
}
```

---

## 4. Obtaining Access Tokens (OAuth 2.0 Token Endpoint)

Agents authenticate using the `client_credentials` grant type:

```http
POST /oauth/token HTTP/1.1
Host: www.ahbinsurancesolutions.com
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "ahb_agent_client_7a9f2e...",
  "client_secret": "ahb_sec_99b1c4..."
}
```

### Token Response:
```json
{
  "access_token": "ahb_agent_...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "api:read api:write blog:generate"
}
```

---

## 5. Token Revocation & Claim Verification

- **Token Revocation Endpoint (RFC 7009):**  
  `POST https://www.ahbinsurancesolutions.com/oauth/revoke`  
  Payload: `{"token": "<access_token>"}`
- **Agent Identity Claim Endpoint:**  
  `POST https://www.ahbinsurancesolutions.com/oauth/claim`  
  Payload: `{"client_id": "<client_id>", "assertion": "<jwt_or_signature>"}`

---

## 6. Supported Scopes

| Scope | Description |
|---|---|
| `api:read` | Read Florida insurance guides, Medicare rate parameters, city data, and FAQs. |
| `api:write` | Programmatically submit consultation and quote request leads via `/api/contact`. |
| `blog:generate` | Request AI-generated educational insurance content via `/api/generate-blog`. |

---

## 7. Protected API Endpoints

- **`POST /api/contact`** - Submit client leads and consultation inquiries for Florida seniors.
- **`POST /api/generate-blog`** - Generate deep educational insurance articles (requires `blog:generate` scope).
- **`GET /api/health`** - Public health check.

All protected API requests must include the Bearer token in the `Authorization` header:
```http
Authorization: Bearer <access_token>
```

---

## 8. Broker Licensure & Compliance

- **Agency:** AHB Insurance Solutions
- **Licensed Independent Broker:** Andres H. Bozo
- **National Producer Number (NPN):** 21228432
- **State Licensing:** Florida Department of Financial Services (DFS)
- **Direct Phone:** +1 (352) 225-8389
- **Email:** andreshbozo@ahbinsurancesolutions.com
- **Office:** 5500 SW Archer Road, Apt H103, Gainesville, FL 32607
