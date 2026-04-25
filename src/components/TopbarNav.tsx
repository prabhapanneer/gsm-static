import { useCallback, useState } from 'react';
import { assetUrl } from '../lib/assetUrl';

const productLinks = [
  { href: 'mutual-funds_v12.html', label: '📈 Mutual Funds' },
  { href: 'insurance-planning_v12.html', label: '🛡️ Insurance' },
  { href: 'fixed-deposits-bonds_v12.html', label: '🏦 FDs & Bonds' },
  { href: 'capital-gain-tax-saving_v12.html', label: '🏠 Capital Gain Tax Saving' },
  { href: 'nri-investment-services_v12.html', label: '✈️ NRI Investment Services' },
  { href: 'aif-pms-sif_v12.html', label: '🌐 AIF, PMS & SIF' },
  { href: 'real-estate_v12.html', label: '🏙️ Real Estate' },
];

export function TopbarNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((o) => !o);
  }, []);

  return (
    <>
      <div className="topbar" id="top">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span>📍 Puzhuthivakkam, Chennai - 600091</span>
            <span>🕐 Mon – Fri | 10:00 AM – 6:00 PM</span>
          </div>
          <div className="topbar-right">
            <a href="tel:+919840211485">📞 +91 98402 11485</a>
            <a href="mailto:info@gsminvestservices.com">✉ info@gsminvestservices.com</a>
            <span className="arn-pill">ARN 174939</span>
          </div>
        </div>
      </div>

      <nav>
        <div className="nav-inner">
          <a href="#top" className="logo" aria-label="GSM Investment Services">
            <img
              src={assetUrl('assets/images/img-39d783410317.jpg')}
              alt="GSM Investment Services"
              className="logo-img"
            />
          </a>
          <ul className="nav-links">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li className="nav-dropdown">
              <a href="#services" className="nav-dropdown-trigger">
                Products ▾
              </a>
              <div className="nav-dropdown-menu">
                {productLinks.map((p) => (
                  <a key={p.href} href={assetUrl(p.href)}>
                    {p.label}
                  </a>
                ))}
              </div>
            </li>
            <li>
              <a href="#who">Who We Work With</a>
            </li>
            <li>
              <a href="#team">Our Team</a>
            </li>
            <li>
              <a href="#newsletter">Newsletter</a>
            </li>
            <li>
              <a href="#books">Books</a>
            </li>
            <li>
              <a
                href="https://wealthelite.in/client-login"
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Client Login →
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="hamburger"
            id="hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            <span
              style={
                mobileOpen
                  ? { transform: 'rotate(45deg) translate(5px,5px)' }
                  : undefined
              }
            />
            <span style={mobileOpen ? { opacity: 0 } : undefined} />
            <span
              style={
                mobileOpen
                  ? { transform: 'rotate(-45deg) translate(5px,-5px)' }
                  : undefined
              }
            />
          </button>
          <div className={`mobile-nav${mobileOpen ? ' active' : ''}`} id="mobile-nav">
            <ul>
              <li>
                <a href="#about" className="mobile-link" onClick={closeMobile}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="mobile-link" onClick={closeMobile}>
                  All Products
                </a>
              </li>
              {productLinks.map((p) => (
                <li key={p.href} style={{ paddingLeft: 10 }}>
                  <a href={assetUrl(p.href)} onClick={closeMobile}>
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#who" className="mobile-link" onClick={closeMobile}>
                  Who We Work With
                </a>
              </li>
              <li>
                <a href="#team" className="mobile-link" onClick={closeMobile}>
                  Our Team
                </a>
              </li>
              <li>
                <a href="#newsletter" className="mobile-link" onClick={closeMobile}>
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#books" className="mobile-link" onClick={closeMobile}>
                  Books
                </a>
              </li>
              <li>
                <a
                  href="https://wealthelite.in/client-login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔐 Client Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
