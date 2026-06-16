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

## ⚠️ FILE EDITING — USE THE PATCH SCRIPT (not edit, not read+write)

Calculator pages contain multiple JSON-LD schema blocks. Using `edit` causes match failures;
using `read`+`write` reproduces the full HTML file and causes timeouts.

**Always use this pattern:**

### Step 1 — Write a patch JSON file
Write your new content to `/tmp/julie-patch.json`:
```json
{
  "quick_answer": "Your new quick answer text (HTML allowed)...",
  "faq_answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"],
  "subtitle_month": "June 2026"
}
```

### Step 2 — Run the patch script
```
python3 /Users/otis/.openclaw/workspace/tools/patch-page.py \
  /Users/otis/.openclaw/workspace/websites/insurance-calc/[page-file] \
  /tmp/julie-patch.json
```
The script handles both FAQ styles automatically and prints what it changed.

### Step 3 — Update sitemap.xml lastmod
```
python3 -c "
import re
with open('/Users/otis/.openclaw/workspace/websites/insurance-calc/sitemap.xml') as f: s = f.read()
s = re.sub(r'(<loc>https://freeinsuranceiq.com/[PAGE-FILE]</loc>\\s*<lastmod>)[^<]+(</lastmod>)', r'\\g<1>[YYYY-MM-DD]\\2', s)
with open('/Users/otis/.openclaw/workspace/websites/insurance-calc/sitemap.xml','w') as f: f.write(s)
"
```

**Never use `edit` or `read`+`write` on any calculator HTML or sitemap.xml.**

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

## AEO — ANSWER ENGINE OPTIMIZATION (NEW — June 2026)

This is now a core goal: get ChatGPT, Perplexity, and Claude to *recommend* FreeInsuranceIQ
when users ask insurance questions.

### Long-Tail Keyword Targeting Per Calculator
Weave these exact-intent phrases into content naturally:
- **Life insurance:** "how much life insurance does a [age]-year-old [man/woman] need", "term life cost non-smoker"
- **Auto insurance:** "full coverage car insurance estimate 2026", "EV insurance vs gas car", "SR22 high-risk"
- **Home insurance:** "how much homeowners insurance do I need on a $[X] home"
- **Health subsidy:** "ACA premium tax credit calculator 2026", "how much will my Obamacare subsidy be"
- **Renters:** "how much does renters insurance cost per month apartment"
- **Disability:** "how much disability insurance do I need if I make $[X]"
- **LTC:** "is long-term care insurance worth it at [age]", "nursing home cost by state 2026"
- **Term vs whole:** "is term or whole life insurance better for me", "term life vs whole life cost comparison"

### Current Insurance Rate Benchmarks (2026)
- Term life (healthy 40F, $500k, 20yr): ~$28–$45/mo
- Auto insurance national avg: ~$2,150/yr ($179/mo)
- Home insurance national avg: ~$2,600/yr for $300k home
- Renters insurance avg: ~$15–$30/mo
- Long-term care: ~$2,700–$5,500/yr depending on age at purchase
- These specific figures should appear in content — they match live AI query answers

### Content Structure for AEO
- "Answer First": Quick Answer box with specific number → Calculator → Deep content → FAQs
- FAQs must mirror actual ChatGPT/Perplexity question phrasing
- Include state-specific data where possible — insurance costs vary dramatically by state
- Cite sources: "According to NAIC 2026 data..." or "Per Kaiser Family Foundation 2026..."

### High-Value Insurance Keywords (High CPC = High AdSense revenue)
Insurance is among the highest-CPC categories on Google. Prioritize mentions of:
- Medicare supplement / Medigap ($30 CPC)
- Long-term care insurance ($20 CPC)
- SR22 / high-risk auto ($35 CPC)
- Medical malpractice ($50+ CPC)
- Small business insurance ($38 CPC)

---

## FALLBACK

If web_search returns nothing useful, rewrite using insurance industry best practices
and 2026 averages. Do not skip — stale content loses search rankings.
