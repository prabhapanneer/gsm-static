import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';
import '../styles/commission-disclosure.css';

const COMMISSION_PDF = assetUrl('assets/disclosures/commission-rate-disclosure.pdf');

export function CommissionDisclosurePage() {
  useEffect(() => {
    document.title = 'Commission Disclosure | GSM Investment Services';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'GSM Investment Services | Trusted Financial Guidance Since 2003';
    };
  }, []);

  return (
    <main className="cd-page">
      <header className="cd-hero">
        <div className="cd-wrap">
          <p className="cd-kicker">Disclosures / Compliance</p>
          <h1>Commission Disclosure</h1>
          <p className="cd-lead">
            Clear information on how GSM Investment Services is compensated for mutual fund distribution and
            other permitted financial products.
          </p>
          <div className="cd-hero-actions">
            <Link to="/" className="btn-ghost cd-back">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <section className="cd-body">
        <div className="cd-wrap cd-content">
          <article className="cd-article">
            <h2>Commission Disclosures</h2>
            <p>
              GSM Investment Services is an AMFI-registered Mutual Fund Distributor and receives commission from
              Asset Management Companies (AMCs) for the distribution of mutual fund products.
            </p>

            <h3>Nature of Commission</h3>
            <p>
              Commission is generally received in the form of trail commission on investments made through GSM
              Investment Services under Regular Plans of mutual fund schemes.
            </p>
            <p>
              The commission is paid by the respective Asset Management Company. GSM Investment Services does not
              separately charge investors any fee for mutual fund distribution services.
            </p>

            <h3>Mutual Fund Distribution</h3>
            <p>GSM Investment Services distributes Regular Plans of mutual fund schemes.</p>
            <p>
              Investors also have the option to invest in Direct Plans directly through the respective Asset
              Management Companies. Direct Plans generally have lower expense ratios as distributor commission or
              distribution expenses are not applicable to them.
            </p>

            <h3>Other Products</h3>
            <p>
              For other financial products such as PMS, AIF, Insurance, or other permitted investment products,
              GSM Investment Services may receive distribution, referral, or other applicable compensation from
              the respective product provider.
            </p>
            <p>
              The nature and amount of such compensation are governed by the respective product provider,
              applicable regulations, and relevant offering documents.
            </p>

            <h3>Transparency</h3>
            <p>
              Commission structures are determined by the respective Asset Management Companies and may vary
              depending on the AMC, scheme, category, and prevailing commission structure.
            </p>
            <p>Commission rates may also be revised by AMCs from time to time.</p>
            <p>
              Investors may contact GSM Investment Services for information regarding the commission applicable
              to a specific mutual fund scheme.
            </p>

            <h3>Important Notes</h3>
            <ul className="cd-notes">
              <li>GSM Investment Services facilitates investments in Regular Plans of mutual fund schemes.</li>
              <li>
                GSM Investment Services receives trail commission from the respective AMCs on eligible investments
                made through its ARN.
              </li>
              <li>No separate fee is charged to investors for mutual fund distribution services.</li>
              <li>Commission rates may vary between AMCs, schemes, and categories.</li>
              <li>GSM Investment Services does not guarantee or assure investment returns.</li>
              <li>
                Mutual fund investments are subject to market risks. Please read all scheme-related documents
                carefully before investing.
              </li>
            </ul>
          </article>

          <aside className="cd-download-panel">
            <h2>Commission Rate Disclosure</h2>
            <p>
              Download or view the current AMC-wise and category-wise commission structure for mutual fund
              distribution.
            </p>
            <a
              className="cd-download-btn"
              href={COMMISSION_PDF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Commission Rate Disclosure
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
