import { Link } from 'react-router-dom';
import { PRODUCT_LINKS } from '../data/productLinks';
import { assetUrl } from '../lib/assetUrl';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="GSM Investment Services">
            <span className="footer-logo-frame">
              <img
                src={assetUrl('assets/images/img-39d783410317.jpg')}
                alt="GSM Investment Services"
                className="footer-logo-img"
              />
            </span>
          </Link>
          <p className="fbrand-desc">
            Helping families with honest, personalised financial guidance since 2003.
          </p>
          <div className="fcontact-list">
            <p className="fcontact-item">
              A-Block, F2, ABS Aswin Adhisaya, Ponnurangam St, Puzhuthivakkam, Chennai - 600091
            </p>
            <p className="fcontact-item">
              <a href="tel:+919840211485">+91 98402 11485</a>
              <span className="fcontact-sep" aria-hidden="true">
                ·
              </span>
              <a href="tel:+919789970712">+91 97899 70712</a>
            </p>
            <p className="fcontact-item">
              <a href="mailto:info@gsminvestservices.com">info@gsminvestservices.com</a>
            </p>
          </div>
          <div className="fbadges">
            <span className="fbadge">ARN 174939</span>
            <span className="fbadge">AMFI Registered</span>
            <span className="fbadge">Since 2003</span>
            <span className="fbadge">CFP</span>
          </div>
        </div>

        <div className="footer-cols">
          <div className="fcol">
            <h4>Products</h4>
            <ul className="flinks">
              {PRODUCT_LINKS.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Company</h4>
            <ul className="flinks">
              <li>
                <a href="/#about">About Us</a>
              </li>
              <li>
                <a href="/#team">Our Team</a>
              </li>
              <li>
                <a href="/#who">Who We Work With</a>
              </li>
              <li>
                <a href="/#newsletter">Newsletter</a>
              </li>
              <li>
                <a href="/#books">Books</a>
              </li>
              <li>
                <a href="https://www.gsminvestservices.blog/" target="_blank" rel="noopener noreferrer">
                  Blog &amp; Videos
                </a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Investor Tools</h4>
            <ul className="flinks">
              <li>
                <a href="#">SIP Calculator</a>
              </li>
              <li>
                <a href="#">Risk Profile Test</a>
              </li>
              <li>
                <a href="#">Financial Fitness Check</a>
              </li>
              <li>
                <a href="#">Check Your KYC</a>
              </li>
              <li>
                <a href="#">Check Your PAN</a>
              </li>
              <li>
                <a href="#">Pay Premium Online</a>
              </li>
              <li>
                <a href="https://wealthelite.in/client-login" target="_blank" rel="noopener noreferrer">
                  Client Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 GSM Investment Services · ARN 174939</div>
        <div>Built on trust. Guided by responsibility.</div>
      </div>
      <div className="footer-disc">
        <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past
        performance is not indicative of future results. GSM Investment Services, ARN 174939, is an AMFI Registered Mutual Fund Distributor and not a SEBI Registered
        Investment Adviser. Information on this website is for general education and should not be treated as personalised investment advice.
      </div>
    </footer>
  );
}
