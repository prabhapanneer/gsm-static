import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsletterIssuesSorted } from '../data/newsletters';
import { assetUrl } from '../lib/assetUrl';
import '../styles/newsletter-page.css';

export function NewsletterPage() {
  const issues = getNewsletterIssuesSorted();

  useEffect(() => {
    document.title = 'Newsletter Archive | GSM Investment Services';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'GSM Investment Services | Trusted Financial Guidance Since 2003';
    };
  }, []);

  return (
    <main className="nl-page">
      <header className="nl-hero">
        <div className="nl-wrap">
          <p className="nl-kicker">GSM Investment Services</p>
          <h1>Newsletter archive</h1>
          <p className="nl-lead">
            Browse previous editions of the GSM newsletter. Open any issue online or download the PDF to
            read later.
          </p>
          <div className="nl-hero-actions">
            <a href="/#contact" className="btn-gold">
              Subscribe Free →
            </a>
            <Link to="/" className="btn-ghost nl-back">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <section className="nl-list-section">
        <div className="nl-wrap">
          <div className="nl-list-head">
            <h2>Past issues</h2>
            <p>New editions are added here each month.</p>
          </div>

          {issues.length === 0 ? (
            <div className="nl-empty">
              <h3>Archive coming soon</h3>
              <p>
                Previous newsletter PDFs will appear on this page as they are published. You can still
                subscribe to receive the next edition by email.
              </p>
              <a href="/#contact" className="btn-navy">
                Subscribe Free →
              </a>
            </div>
          ) : (
            <ul className="nl-grid">
              {issues.map((issue) => {
                const href = assetUrl(`assets/newsletters/${issue.file}`);
                return (
                  <li className="nl-card" key={issue.id}>
                    <div className="nl-card-top">
                      <span className="nl-month">{issue.monthLabel}</span>
                      <span className="nl-badge">PDF</span>
                    </div>
                    <h3>{issue.title}</h3>
                    {issue.description ? <p>{issue.description}</p> : null}
                    <div className="nl-card-actions">
                      <a className="nl-btn-primary" href={href} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                      <a className="nl-btn-secondary" href={href} download={issue.file}>
                        Download
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
