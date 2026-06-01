# FreeInsuranceIQ.com — Content Refresh Instructions

This file contains the site-specific rules for refreshing FreeInsuranceIQ calculator pages.
The Universal Content Refresh Agent reads this file each run.

---

## SITE CONTEXT

FreeInsuranceIQ (https://freeinsuranceiq.com) is a free insurance calculator hub with 8 tools:
Life Insurance, Auto Insurance, Home Insurance, Health Insurance Subsidy, Renters Insurance,
Disability Insurance, Long-Term Care Cost, and Term vs. Whole Life Comparison.
Monetized via Google AdSense (insurance niche, very high CPC $19–75). AIO optimization and
plain-language educational content are the primary goals of each refresh.

---

## RESEARCH STEP

Before rewriting anything, use web_search to find:
- Top Reddit, Quora, or social media questions about today's topic (e.g. "reddit life insurance questions 2026")
- Recent news relevant to the topic (Fed rate changes, ACA updates, Medicare changes, insurer exits, etc.)
- Current rate benchmarks (average auto insurance premium by state 2026, average life insurance rates, etc.)
- "People Also Ask" (PAA) style questions from current Google search trends for this insurance type

---

## WHAT TO UPDATE EACH RUN

### 1. Quick Answer Blurb
Immediately after the opening `<div class="content-section">` tag, add or update:

```html
<p class="quick-answer" style="background:#f0fff8; border-left:4px solid #0f9e6e; padding:12px 16px; border-radius:6px; font-size:0.95rem; margin-bottom:20px;">
  [Direct answer to the page's core insurance question in plain language.]
</p>
```

Google AI Overviews pull these verbatim. Lead with a specific number or fact when possible.

### 2. Content Section Paragraphs
Rewrite the 3 educational paragraphs. Keep HTML structure identical — only update text.
Weave in current 2026 data: premium averages, rate trends, regulatory changes, real examples.

### 3. FAQ Answers
Rewrite all 5 FAQ answers. Format rules:
- 2–3 sentences max — snackable for AI Overviews and featured snippets
- Direct answer first, explanation second
- Use specific numbers (e.g. "average $147/month", "30-year term costs 65% less than whole life")
- Each answer must be self-contained and readable without context

### 4. Sitemap lastmod
Update `<lastmod>` for this page in sitemap.xml to today's date (YYYY-MM-DD).

### 5. Subtitle
Update `.calc-panel .subtitle` to include ` · Updated [Month YYYY]` at the end.

---

## GIT COMMIT FORMAT

```
Julie: refresh [page-file-name] content + AIO - [YYYY-MM-DD]
```
Only stage the updated page and sitemap.xml:
```
git add [page].html sitemap.xml
```

---

## AIO OPTIMIZATION RULES (INSURANCE-SPECIFIC)

- Always cite a specific dollar amount or percentage in the Quick Answer blurb
- Use state-specific data where possible (insurance costs vary dramatically by state)
- Address common fears: "will my claim be denied?", "am I paying too much?", "do I really need this?"
- FAQ answers should target actual PAA questions from Google for that insurance type
- Avoid insurer brand names — stay neutral and independent
- Include 2026 data whenever available (premium averages, coverage statistics, regulatory changes)

---

## WHAT NEVER CHANGES

- Calculator logic (JavaScript formulas and rate tables)
- Form inputs or calculator UI
- CSS styles and color scheme
- Navigation or footer
- Structured data / schema JSON
- Number of content sections (always 3) or FAQs (always 5)

---

## FALLBACK

If web_search returns nothing useful, rewrite using insurance industry best practices
and 2026 averages. Do not skip — stale content loses search rankings.
