import { assetUrl } from '../lib/assetUrl';

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo" style={{ marginBottom: 18 }}>
            <div style={{ display: 'inline-block', background: '#ffffff', borderRadius: 10, padding: '8px 16px' }}>
              <img
                src={assetUrl('assets/images/img-39d783410317.jpg')}
                alt="GSM Investment Services"
                style={{ height: 52, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
          </div>
          <p className="fbrand-desc">
            Founded in 2003, GSM Investment Services has been helping families with honest, personalised, and long-term financial guidance for more than 23 years.
          </p>
          <div className="fcontact-item">
            <span>📍</span>
            <span>
              A-Block, F2, ABS Aswin Adhisaya, Ponnurangam St,
              <br />
              Puzhuthivakkam, Chennai - 600091
            </span>
          </div>
          <div className="fcontact-item">
            <span>📞</span>
            <a href="tel:+919840211485">+91 98402 11485</a>
          </div>
          <div className="fcontact-item">
            <span>📞</span>
            <a href="tel:+919789970712">+91 97899 70712</a>
          </div>
          <div className="fcontact-item">
            <span>✉</span>
            <a href="mailto:info@gsminvestservices.com">info@gsminvestservices.com</a>
          </div>
          <div className="fbadges">
            <span className="fbadge">ARN 174939</span>
            <span className="fbadge">AMFI Registered MFD</span>
            <span className="fbadge">Since May 2003</span>
            <span className="fbadge">CFP Qualified</span>
          </div>
        </div>
        <div className="fcol">
          <h4>Products</h4>
          <ul className="flinks">
            <li>
              <a href={assetUrl('mutual-funds_v12.html')}>Mutual Funds</a>
            </li>
            <li>
              <a href={assetUrl('insurance-planning_v12.html')}>Insurance</a>
            </li>
            <li>
              <a href={assetUrl('fixed-deposits-bonds_v12.html')}>Fixed Deposits &amp; Bonds</a>
            </li>
            <li>
              <a href={assetUrl('capital-gain-tax-saving_v12.html')}>Capital Gain Tax Saving</a>
            </li>
            <li>
              <a href={assetUrl('nri-investment-services_v12.html')}>NRI Investment Services</a>
            </li>
            <li>
              <a href={assetUrl('aif-pms-sif_v12.html')}>AIF, PMS &amp; SIF</a>
            </li>
            <li>
              <a href={assetUrl('real-estate_v12.html')}>Real Estate</a>
            </li>
          </ul>
        </div>
        <div className="fcol">
          <h4>Company</h4>
          <ul className="flinks">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#team">Our Team</a>
            </li>
            <li>
              <a href="#who">Who We Work With</a>
            </li>
            <li>
              <a href="#newsletter">Newsletter</a>
            </li>
            <li>
              <a href="#books">Books by Our CEO</a>
            </li>
            <li>
              <a href="https://www.gsminvestservices.blog/" target="_blank" rel="noopener noreferrer">
                Blog &amp; Videos
              </a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#">Commission Disclosure</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
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
              <a href="#">Client Login</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 GSM Investment Services. All Rights Reserved. | ARN 174939 | Initial Registration: May 2003</div>
        <div>Built on trust. Guided by responsibility.</div>
      </div>
      <div className="footer-disc">
        <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past
        performance is not indicative of future results. GSM Investment Services, ARN 174939, is an AMFI Registered Mutual Fund Distributor and not a SEBI Registered
        Investment Adviser. The information provided on this website is meant for general educational purposes and should not be treated as personalised investment
        advice.
      </div>
    </footer>
  );
}
