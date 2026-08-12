/**
 * Monthly GSM newsletter archive.
 *
 * How to add a new edition each month:
 * 1. Put the PDF in `assets/newsletters/` (e.g. `gsm-newsletter-2026-08.pdf`)
 * 2. Add an entry below (newest at the top is fine; the page sorts by `publishedAt`)
 * 3. Run `npm run dev` or `npm run build` so `public/` stays in sync
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
  /** PDF filename inside assets/newsletters/ */
  file: string;
  /** ISO date used for sorting (newest first) */
  publishedAt: string;
};

export const NEWSLETTER_ISSUES: NewsletterIssue[] = [
  // Example (uncomment and adjust when the first PDF is ready):
  // {
  //   id: '2026-08',
  //   title: 'GSM Newsletter, August 2026',
  //   monthLabel: 'August 2026',
  //   description: 'Market notes, mutual fund updates, and practical planning tips.',
  //   file: 'gsm-newsletter-2026-08.pdf',
  //   publishedAt: '2026-08-01',
  // },
];

export function getNewsletterIssuesSorted(): NewsletterIssue[] {
  return [...NEWSLETTER_ISSUES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
