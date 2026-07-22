import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_LINKS } from '../data/productLinks';
import { assetUrl } from '../lib/assetUrl';

export function TopbarNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((o) => {
      if (o) setMobileProductsOpen(false);
      return !o;
    });
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
            <span>Puzhuthivakkam, Chennai</span>
            <span className="topbar-sep" aria-hidden="true">
              ·
            </span>
            <span>Mon – Fri · 10 AM – 6 PM</span>
          </div>
          <div className="topbar-right">
            <a href="tel:+919840211485" className="topbar-phone">
              +91 98402 11485
            </a>
            <a href="mailto:info@gsminvestservices.com" className="topbar-mail">
              info@gsminvestservices.com
            </a>
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
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 4.5L6 8l3.5-3.5" />
                  </svg>
                </span>
              </button>
              <div className="nav-dropdown-menu" id="products-menu" role="menu" aria-hidden={!productsOpen}>
                {PRODUCT_LINKS.map((p) => (
                  <Link key={p.to} to={p.to} role="menuitem" onClick={closeProducts}>
                    {p.label}
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
              <a href="https://wealthelite.in/client-login" className="nav-cta" target="_blank" rel="noopener noreferrer">
                Client Login →
              </a>
            </li>
          </ul>
          <button
            type="button"
            className={`hamburger${mobileOpen ? ' is-open' : ''}`}
            id="hamburger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={toggleMobile}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          className={`mobile-nav${mobileOpen ? ' active' : ''}`}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobile();
          }}
        >
          <div className="mobile-nav-panel" role="document">
            <div className="mobile-nav-head">
              <div>
                <p className="mobile-nav-kicker">GSM Investment Services</p>
                <p className="mobile-nav-title">Menu</p>
              </div>
              <button type="button" className="mobile-nav-close" onClick={closeMobile} aria-label="Close menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mobile-nav-body">
              <ul className="mobile-nav-list">
                <li>
                  <a href="/#about" onClick={closeMobile}>
                    About Us
                  </a>
                </li>
                <li className={`mobile-acc${mobileProductsOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="mobile-acc-trigger"
                    aria-expanded={mobileProductsOpen}
                    aria-controls="mobile-products"
                    onClick={() => setMobileProductsOpen((o) => !o)}
                  >
                    <span>Products</span>
                    <span className="mobile-acc-chevron" aria-hidden="true">
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 4.5L6 8l3.5-3.5" />
                      </svg>
                    </span>
                  </button>
                  <ul id="mobile-products" className="mobile-acc-panel" hidden={!mobileProductsOpen}>
                    <li>
                      <a href="/#services" onClick={closeMobile}>
                        All Products
                      </a>
                    </li>
                    {PRODUCT_LINKS.map((p) => (
                      <li key={p.to}>
                        <Link to={p.to} onClick={closeMobile}>
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <a href="/#who" onClick={closeMobile}>
                    Who We Work With
                  </a>
                </li>
                <li>
                  <a href="/#team" onClick={closeMobile}>
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="/#newsletter" onClick={closeMobile}>
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="/#books" onClick={closeMobile}>
                    Books
                  </a>
                </li>
              </ul>
            </div>

            <div className="mobile-nav-foot">
              <a className="mob-cta-gold" href="/#contact" onClick={closeMobile}>
                Book a Consultation
              </a>
              <a
                className="mob-cta-primary"
                href="https://wealthelite.in/client-login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
              >
                Client Login →
              </a>
              <a className="mobile-nav-tel" href="tel:+919840211485">
                Call +91 98402 11485
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
