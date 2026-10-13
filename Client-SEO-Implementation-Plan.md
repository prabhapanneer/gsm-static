# Client SEO PDF Implementation Plan

**Overview:** Implement the client's SEO PDF — Chennai-focused home title/meta/H1/hero copy, keyword H1s and answer paragraphs on four product pages, and fix product eyebrows from Since 2003 to Since 2001.

**Source:** `Website seo .pdf` (5 pages)

---

## What the client asked for

| Area | Change |
|------|--------|
| Home title | `Best Financial Advisor in Chennai – GSM Investment Services` |
| Home meta description | Looking for the Best financial advisor in Chennai? GSM Investment Services provides Mutual Funds, Goal Based Financial Planning, Retirement Planning, Insurance and Investment Guidance. |
| Home H1 | Replace *Helping families build wealth…* with **Best financial planner in Chennai for goal-based investment planning** |
| Home hero paragraph | Replace current short blurb with the longer “financial planner in Chennai…” copy from the PDF |
| Mutual Funds | H1 → **How to invest in mutual funds** + direct-answer hero; H2 *What mutual funds mean in simple terms* → **What is Mutual fund** |
| Insurance | H1 → **What is Insurance Planning and How Does It Work?** + direct-answer hero |
| Capital Gain | H1 → **How can I save tax on the capital gain** + direct-answer hero |
| NRI | H1 → **How can an NRI Invest in India** + direct-answer hero |
| All product pages | Eyebrow `Since 2003` → `Since 2001` |

Copy will follow the PDF wording, with light casing fixes only (e.g. NRI, India, GSM).

---

## Current state (gaps)

- Title only in `index.html`; **no meta description**
- Home H1/hero in `src/components/MainScrollSections.tsx`
- Product content + H1s live in `src/data/productPages.json` (rendered by `ProductPage.tsx`)
- Product eyebrows still say **Since 2003**; footer already says since 2001
- Title cleanup strings still use the old “Since 2003” home title

---

## Implementation

### 1. Home page SEO + hero

**`index.html`**
- Set `<title>` to the new Chennai title
- Add `<meta name="description" content="…">` with the client’s meta text

**`src/components/MainScrollSections.tsx`**
- Replace H1 and `hero-desc` paragraph with the PDF text
- Keep existing CTAs, stats card, and layout

**`src/pages/HomePage.tsx`**
- On mount, set `document.title` and update/create `meta[name="description"]` so returning from product pages restores home SEO (products currently reset title to the old string)

### 2. Product page content (`src/data/productPages.json`)

For **all 7** products: replace `GSM Investment Services | Since 2003` → `Since 2001`.

For these **4** products, update H1, hero paragraph (`hero-text`), and `documentTitle` to match the new H1:

- **mutual-funds** — H1 + hero answer; rename first H2 to `What is Mutual fund`
- **insurance** — H1 + hero answer
- **capital-gain-tax-saving** — H1 + hero answer
- **nri-investment-services** — H1 + hero answer

Leave FDs & Bonds, AIF/PMS/SIF, and Real Estate body copy unchanged (only eyebrow year).

Nav labels / quick-links stay as today (Mutual Funds, Insurance, etc.) so menus do not become long question-style H1s.

### 3. Sync title fallbacks

Update the default title string in:

- `src/pages/ProductPage.tsx`
- `src/pages/NewsletterPage.tsx`
- `src/pages/CommissionDisclosurePage.tsx`

so unmount cleanup matches the new home title.

### 4. Out of scope (not in the PDF)

- `robots.txt` / `sitemap.xml` / Open Graph / JSON-LD
- Rewriting FD, AIF, Real Estate product H1s
- Changing homepage services-card titles
- Regenerating legacy `*_v12.html` (SPA uses JSON; redirects already point to clean URLs)

---

## Implementation checklist

1. Update `index.html` title/meta + `MainScrollSections` H1/hero + `HomePage` title/meta restore
2. Update `productPages.json`: Since 2001 on all; H1/hero/documentTitle (+ MF H2) for MF, Insurance, Capital Gain, NRI
3. Sync default `document.title` fallbacks in Product/Newsletter/Commission pages
4. Verify home + four product pages in browser

---

## Verify after implementation

- Home: title, meta description, H1, hero paragraph
- `/mutual-funds`, `/insurance`, `/capital-gain-tax-saving`, `/nri-investment-services`: new H1 + hero; MF first H2 rename
- Any product page: eyebrow shows **Since 2001**
- Navigate home → product → home: title/meta restore correctly
