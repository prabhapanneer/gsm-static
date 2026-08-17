/**
 * Monthly GSM newsletter archive.
 *
 * How to add a new edition each month:
 * 1. Put the PDF in `public/assets/newsletters/` (e.g. `gsm-newsletter-2026-08.pdf`)
 * 2. Add an entry below (newest at the top is fine; the page sorts by `publishedAt`)
 * 3. No sync step needed — files in `public/assets` are served directly
 */
export type NewsletterIssue = {
  /** Stable id, e.g. "2026-08" */
  id: string;
  /** Display title */
  title: string;
  /** Short month/year label shown on the card, e.g. "August 2026" */
  monthLabel: string;
  /** Optional one-line summary */
  description?: string;
  /** PDF filename inside public/assets/newsletters/ */
  file: string;
  /** ISO date used for sorting (newest first) */
  publishedAt: string;
};

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  {
    id: '2026-08-sample',
    title: 'GSM Newsletter, August 2026 (Sample)',
    monthLabel: 'August 2026',
    description: 'Sample edition so you can try View and Download. Replace with your real monthly PDF anytime.',
    file: 'gsm-newsletter-2026-08-sample.pdf',
    publishedAt: '2026-08-01',
  },
];

export function getNewsletterIssuesSorted(): NewsletterIssue[] {
  return [...NEWSLETTER_ISSUES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
