import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_LINKS } from '../data/productLinks';
import { assetUrl } from '../lib/assetUrl';

export function TopbarNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((o) => !o);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openProducts = useCallback(() => {
    clearCloseTimer();
    setProductsOpen(true);
  }, [clearCloseTimer]);

  const scheduleCloseProducts = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  }, [clearCloseTimer]);

  const closeProducts = useCallback(() => {
    clearCloseTimer();
    setProductsOpen(false);
  }, [clearCloseTimer]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
    return () => document.body.classList.remove('nav-open');
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen && !productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobile();
        closeProducts();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen, productsOpen, closeMobile, closeProducts]);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        closeProducts();
      }
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [productsOpen, closeProducts]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

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
          <Link to="/" className="logo" aria-label="GSM Investment Services" onClick={closeMobile}>
            <img
              src={assetUrl('assets/images/img-39d783410317.jpg')}
              alt="GSM Investment Services"
              className="logo-img"
            />
          </Link>
          <ul className="nav-links">
            <li>
              <a href="/#about">About Us</a>
            </li>
            <li
              className={`nav-dropdown${productsOpen ? ' is-open' : ''}`}
              ref={productsRef}
              onMouseEnter={openProducts}
              onMouseLeave={scheduleCloseProducts}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                aria-controls="products-menu"
                onClick={() => setProductsOpen((o) => !o)}
              >
                Products
                <span className="nav-dropdown-chevron" aria-hidden="true">
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" />
                  </svg>
                </span>
              </button>
              <div
                className="nav-dropdown-menu"
                id="products-menu"
                role="menu"
                aria-hidden={!productsOpen}
              >
                {PRODUCT_LINKS.map((p) => (
                  <Link key={p.to} to={p.to} role="menuitem" onClick={closeProducts}>
                    {p.menuLabel}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <a href="/#who">Who We Work With</a>
            </li>
            <li>
              <a href="/#team">Our Team</a>
            </li>
            <li>
              <a href="/#newsletter">Newsletter</a>
            </li>
            <li>
              <a href="/#books">Books</a>
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
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={toggleMobile}
          >
            <span
              style={
                mobileOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : undefined
              }
            />
            <span style={mobileOpen ? { opacity: 0 } : undefined} />
            <span
              style={
                mobileOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : undefined
              }
            />
          </button>
        </div>

        <div
          className={`mobile-nav${mobileOpen ? ' active' : ''}`}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          hidden={!mobileOpen}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobile();
          }}
        >
          <div className="mobile-nav-panel">
            <ul>
              <li>
                <a href="/#about" className="mobile-link" onClick={closeMobile}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/#services" className="mobile-link" onClick={closeMobile}>
                  All Products
                </a>
              </li>
              {PRODUCT_LINKS.map((p) => (
                <li key={p.to} className="mob-sub">
                  <Link to={p.to} onClick={closeMobile}>
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/#who" className="mobile-link" onClick={closeMobile}>
                  Who We Work With
                </a>
              </li>
              <li>
                <a href="/#team" className="mobile-link" onClick={closeMobile}>
                  Our Team
                </a>
              </li>
              <li>
                <a href="/#newsletter" className="mobile-link" onClick={closeMobile}>
                  Newsletter
                </a>
              </li>
              <li>
                <a href="/#books" className="mobile-link" onClick={closeMobile}>
                  Books
                </a>
              </li>
            </ul>
            <div className="mob-cta">
              <a
                className="mob-cta-primary"
                href="https://wealthelite.in/client-login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
              >
                Client Login →
              </a>
              <a className="mob-cta-gold" href="/#contact" onClick={closeMobile}>
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
