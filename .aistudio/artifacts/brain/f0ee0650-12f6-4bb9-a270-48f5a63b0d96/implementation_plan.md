# Implementation Plan - Author Component & E-E-A-T Trust Signals

Architectural blueprint for creating a modular, bilingual `Author` (E-E-A-T) component showcasing licensed broker **Andres H. Bozo** (Florida License / NPN: **21228432**), emphasizing over a decade of licensed independent insurance advisory in Florida, and integrating it cleanly into the `AboutUs` and `Footer` sections.

---

## 1. User Experience & Interaction Blueprint

### A. Experience Overview & Personas
- **Target Audience**: Florida seniors exploring Medicare Supplement options, families seeking final expense/burial insurance, and professionals planning tax-advantaged retirement with Indexed Universal Life (IUL).
- **E-E-A-T Goal**: Establish undeniable Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) directly on landing pages. Users see verified regulatory identification (National Producer Number: 21228432), state jurisdiction (Florida Department of Financial Services), and 10+ years of active field practice.

### B. Component Variants & Integration Surfaces
The `Author` component supports flexible variants tailored to each context:

1. **`card` Variant (Hero & AboutUs section)**:
   - High-resolution, professional portrait (`/andresbozoofi.webp`) with graceful responsive sizing and srcset.
   - Verified badge with Florida DFS licensing status and official NPN `21228432`.
   - Concise bio summarizing 10+ years of experience helping Florida families navigate Medicare, Final Expense, and IUL.
   - Interactive hover/focus tooltip with official regulatory details and transparency statement.
   - Embedded `schema.org/Person` microdata for rich search engine crawler extraction.

2. **`compact` / `footer` Variant (Footer section)**:
   - Horizontal trust strip integrated directly into the footer hierarchy.
   - Circular portrait avatar with subtle golden border and verified shield icon.
   - Name, license title ("Andres H. Bozo · Licensed Broker NPN: 21228432"), and 1-line authority tagline ("10+ Years Guiding Florida Seniors & Families").
   - Keyboard-accessible tooltip and link to `/about-andres-bozo` (or `/es/sobre-andres-bozo` in Spanish).

---

## 2. Visual & Design System Decisions

Following the `frontend-design` constitution and landing page design guidelines:
- **Zero-Pill Discipline**: Metadata is styled as refined unboxed text separated by typographic middots (`·`) rather than garish candy badges or generic pill enclosures.
- **Color Tokens**:
  - Primary: Deep Navy `#003366` (Trust, institutional credibility)
  - Secondary: Slate `#334155` / `#475569` (Professional authority)
  - Accent: Warm Gold / Amber `#D97706` / `#8A6000` (10+ years badge & verified check)
  - Background: Crisp White `#FFFFFF` and Slate Tint `#F8FAFC`
- **Typography Hierarchy**:
  - Display Name: `font-heading font-black text-xl md:text-2xl tracking-tight text-primary`
  - License & NPN: `text-xs font-bold uppercase tracking-wider text-[#8A6000]`
  - Bio Copy: `text-sm text-slate-600 leading-relaxed`
- **Spatial & Container Math**:
  - Avatar aspect ratio: High-fidelity 1:1 circular crop for footer, 4:5 portrait crop for AboutUs.
  - Border radius: $r_{\text{inner}} = r_{\text{outer}} - \text{padding}$ with hairline borders (`border-slate-200/80` or `border-white/10` in dark footer).
  - Touch target compliance: all links and tooltip triggers $\ge 44\text{px}$.

---

## 3. Technical Architecture & System Integration

### System Diagram & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                          App Container                          │
├────────────────────────────────┬────────────────────────────────┤
│       AboutUs Section          │         Footer Section         │
│  ┌──────────────────────────┐  │  ┌──────────────────────────┐  │
│  │   <Author                │  │  │   <Author                │  │
│  │     variant="card"       │  │  │     variant="compact"    │  │
│  │     language={lang}      │  │  │     language={lang}      │  │
│  │     priority={true} />   │  │  │     theme="dark" />      │  │
│  └─────────────┬────────────┘  │  └─────────────┬────────────┘  │
└────────────────┼───────────────┴────────────────┼───────────────┘
                 │                                │
                 ▼                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Shared <Author /> Core                      │
│  • Headshot with WebP srcset + lazy/eager loading support       │
│  • Verified NPN 21228432 + FL DFS License Indicator             │
│  • 10+ Years Experience E-E-A-T Bio & Specialty Badges         │
│  • Schema.org JSON-LD / Microdata (Person, InsuranceAgency)     │
│  • Bilingual localization (English & Spanish)                   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow & Localization
- The component reads the current language (`'en' | 'es'`) from props or translation context.
- English copy: *"Andres H. Bozo is an independent, state-licensed insurance broker (NPN: 21228432) with over 10 years of dedicated experience guiding Florida families through Medicare, Final Expense, and Indexed Universal Life insurance."*
- Spanish copy: *"Andrés H. Bozo es un corredor de seguros independiente licenciado en Florida (NPN: 21228432) con más de 10 años de experiencia asesorando a familias y personas mayores en Medicare, Gastos Finales y Vida Universal Indexada (IUL)."*

---

## 4. Phased Execution & Verification Plan

### Phase 1: Component Creation (`components/Author.tsx`)
- Implement `Author.tsx` supporting `variant="card" | "compact" | "badge"`, `theme="light" | "dark"`, and bilingual content strings.
- Incorporate existing local image asset `/andresbozoofi.webp` and `/andresbozoofi-sm.webp` with proper fallback and `referrerPolicy="no-referrer"`.
- Include accessible tooltip for NPN 21228432 and state licensing verification.

### Phase 2: Integration into `AboutUs.tsx`
- Refactor `components/AboutUs.tsx` to utilize the new `<Author variant="card" />` component in the profile column, eliminating redundant code while improving layout responsiveness and structured data.

### Phase 3: Integration into `Footer.tsx`
- Embed `<Author variant="compact" theme="dark" />` into `components/Footer.tsx` above or alongside the brand/licensing column, providing immediate E-E-A-T proof in the footer without disrupting footer navigation grids.

### Phase 4: Build & SEO Verification
- Execute `npm run lint` and `npm run build` (including Vite build, SSG prerendering of 58 pages, and sitemap generation).
- Verify rendering across desktop, tablet, and mobile viewports.

---

## 5. Risk Analysis & Mitigation Strategy

| Risk / Failure Mode | Likelihood | Impact | Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Footer Layout Disruption** | Low | Medium | Use `compact` variant with flexbox auto-wrapping; keep DOM footprint light and responsive on screens down to 320px. |
| **Image Loading Latency** | Low | Low | Utilize existing responsive WebP images (`andresbozoofi-sm.webp` for mobile/compact, `andresbozoofi.webp` for desktop) with explicit `width`, `height`, and `decoding="async"`. |
| **Language Mismatch** | Very Low | Medium | Author component accepts `language` prop matching the global state (`'en'` or `'es'`) to deliver 100% natural localized copy. |
| **Accessibility & Contrast** | Very Low | Low | Validate color contrast in dark footer (minimum 4.5:1 text ratio) and ensure full keyboard navigation (`focus-visible`). |
