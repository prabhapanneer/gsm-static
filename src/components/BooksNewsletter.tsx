import { assetUrl } from '../lib/assetUrl';

export function BooksNewsletter() {
  return (
    <>
      <section className="books" id="books">
        <div className="si">
          <div className="books-head">
            <div className="ceo-pic-wrap reveal">
              <img src={assetUrl('assets/images/img-998991eb0739.jpg')} alt="Vishal Muralidharan" className="ceo-pic" />
            </div>
            <div className="books-copy">
              <div className="stag">
                <span className="stag-line" />
                <span className="stag-text">Author Spotlight</span>
              </div>
              <h2 className="sh books-heading">Books by Our CEO</h2>
              <p className="books-lead">
                Written by Vishal Muralidharan, these books are designed to make financial thinking simpler, more practical, and more meaningful in real life.
              </p>
              <p className="sdesc">
                From mutual funds and retirement thinking to goal-based financial decision-making, the aim is to explain important ideas in a way that feels clear, usable, and easy to connect with.
              </p>
            </div>
          </div>

          <div className="books-grid">
            <div className="book-card reveal">
              <img
                src={assetUrl('assets/images/img-fdd4179b489d.png')}
                alt="Goal Based Financial Case Studies book cover"
                className="book-cover"
              />
              <div className="book-body">
                <div className="book-label">Published Book</div>
                <div className="book-title">Goal Based Financial Case Studies</div>
                <p className="book-sub">
                  A practical look at financial planning through real-life goal-based examples that help readers connect money decisions to meaningful outcomes.
                </p>
                <div className="book-meta">
                  <span className="book-tag">Goal-based planning</span>
                  <span className="book-tag">Case study style</span>
                </div>
                <div className="book-actions">
                  <a
                    className="book-link"
                    href="https://notionpress.com/in/read/goal-based-financial-case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Purchase on Notion Press →
                  </a>
                </div>
              </div>
            </div>

            <div className="book-card reveal">
              <img
                src={assetUrl('assets/images/img-647c72e6302c.png')}
                alt="Retire Early Through Mutual Funds book cover"
                className="book-cover"
              />
              <div className="book-body">
                <div className="book-label">Published Book</div>
                <div className="book-title">Retire Early Through Mutual Funds</div>
                <p className="book-sub">
                  A simple and focused take on using mutual funds with discipline and long-term thinking to move towards financial independence and earlier retirement goals.
                </p>
                <div className="book-meta">
                  <span className="book-tag">Mutual funds</span>
                  <span className="book-tag">Retirement planning</span>
                </div>
                <div className="book-actions">
                  <a
                    className="book-link"
                    href="https://notionpress.com/in/read/retire-early-through-mutual-funds"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Purchase on Notion Press →
                  </a>
                </div>
              </div>
            </div>

            <div className="book-card upcoming-card reveal">
              <div className="book-body">
                <div className="upcoming-pill">Upcoming Book</div>
                <div className="book-title">Kurukshetra of Investing</div>
                <p className="book-sub">
                  An upcoming work that connects investing behaviour, financial decisions, and deeper patterns of discipline, conflict, and clarity through a more thoughtful lens.
                </p>
                <div className="book-meta">
                  <span
                    className="book-tag"
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', color: '#fff' }}
                  >
                    Upcoming release
                  </span>
                  <span
                    className="book-tag"
                    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', color: '#fff' }}
                  >
                    Behavioral finance
                  </span>
                </div>
                <div className="book-actions">
                  <span className="book-secondary" style={{ color: 'var(--gold-light)' }}>
                    More details will be shared soon.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div className="newsletter-box si">
          <div>
            <div className="newsletter-label">GSM Newsletter</div>
            <h3>
              Stay informed on markets,
              <br />
              investments &amp; financial planning.
            </h3>
            <p>
              Receive curated insights on mutual funds, financial planning, market updates, and practical tips — written in simple language, delivered monthly.
            </p>
            <div className="newsletter-note">🔒 No spam. Unsubscribe anytime.</div>
          </div>
          <div className="newsletter-actions">
            <a href="#contact" className="btn-gold">
              Subscribe Free →
            </a>
            <a
              href="#"
              className="btn-ghost"
              style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}
              onClick={(e) => e.preventDefault()}
            >
              View Past Issues
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
