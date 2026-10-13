# Core Web Vitals & Performance Optimization Plan

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your preferences, we are prioritizing **Core Web Vitals & Performance (Images, Fonts, LCP)** and will proceed with **individual category review and approval**.

- **Confirmed Priority**: Core Web Vitals, LCP optimization, responsive image preloading, and non-blocking font delivery.
- **Workflow**: Step-by-step implementation and review of performance improvements.

---

## 1. Overview & Core Concept

- **What It Does**: Optimizes loading speed, Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT) for mobile and desktop users.
- **Target Audience**: Visitors accessing insurance solutions on mobile and desktop devices.
- **Key Value**: Instant page loads, high PageSpeed score, and flawless mobile experience.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. Instant initial render without render-blocking font or script delays.
  2. LCP hero images prioritized with preconnect, dns-prefetch, and high-priority fetch headers.
  3. Zero layout shifts (CLS = 0) via explicit SVG and image dimensions.
- **Visual Identity**: Maintains pristine brand presentation while removing performance bottlenecks.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Asynchronous Font & Script Loading**
  - *Chosen Approach*: Defer non-critical stylesheets (Google Fonts via media="print" onload trick) and async/defer third-party scripts.
  - *Why*: Eliminates render-blocking resource warnings and cuts mobile First Contentful Paint (FCP).
- **Decision 2: Image & LCP Optimization**
  - *Chosen Approach*: Add explicit `preconnect` and `dns-prefetch` for Pexels/external image CDNs, alongside responsive `srcset` and `fetchpriority="high"` on hero images.
  - *Why*: Directly improves LCP timings on mobile devices.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   index.html Headers                   │
│   (preconnect, dns-prefetch, async CSS, deferred JS)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Component Assets                     │
│   (Logo with explicit dimensions, optimized LCP image) │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                Performance Verification                │
│       (compile_applet, lint_applet, build checks)      │
└────────────────────────────────────────────────────────┘
```

- **Deliverables**:
  1. Enhanced HTML asset hints (`preconnect`, `dns-prefetch`, `preload`).
  2. Optimized component image attributes (explicit dimensions, high priority).
  3. Linter and build verification.
