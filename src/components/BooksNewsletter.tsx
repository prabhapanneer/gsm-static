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
            <article className="book-card reveal">
              <div className="book-cover-wrap">
                <img
                  src={assetUrl('assets/images/img-fdd4179b489d.png')}
                  alt="Goal Based Financial Case Studies book cover"
                  className="book-cover"
                />
              </div>
              <div className="book-body">
                <div className="book-label">Published</div>
                <h3 className="book-title">Goal Based Financial Case Studies</h3>
                <p className="book-sub">
                  Real-life goal-based examples that help connect money decisions to meaningful outcomes.
                </p>
                <div className="book-meta">
                  <span className="book-tag">Goal-based planning</span>
                  <span className="book-tag">Case studies</span>
                </div>
                <a
                  className="book-link"
                  href="https://notionpress.com/in/read/goal-based-financial-case-studies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Purchase on Notion Press →
                </a>
              </div>
            </article>

            <article className="book-card reveal">
              <div className="book-cover-wrap">
                <img
                  src={assetUrl('assets/images/img-647c72e6302c.png')}
                  alt="Retire Early Through Mutual Funds book cover"
                  className="book-cover"
                />
              </div>
              <div className="book-body">
                <div className="book-label">Published</div>
                <h3 className="book-title">Retire Early Through Mutual Funds</h3>
                <p className="book-sub">
                  A focused take on using mutual funds with discipline to move toward financial independence.
                </p>
                <div className="book-meta">
                  <span className="book-tag">Mutual funds</span>
                  <span className="book-tag">Retirement</span>
                </div>
                <a
                  className="book-link"
                  href="https://notionpress.com/in/read/retire-early-through-mutual-funds"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Purchase on Notion Press →
                </a>
              </div>
            </article>

            <article className="book-card upcoming-card reveal">
              <div className="book-cover-wrap book-cover-wrap-soon">
                <div className="book-cover-soon">
                  <span>Coming soon</span>
                  <strong>Kurukshetra of Investing</strong>
                </div>
              </div>
              <div className="book-body">
                <div className="book-label book-label-soon">Upcoming</div>
                <h3 className="book-title">Kurukshetra of Investing</h3>
                <p className="book-sub">
                  Investing behaviour, discipline, and clarity — explored through a more thoughtful lens.
                </p>
                <div className="book-meta">
                  <span className="book-tag book-tag-soon">Upcoming release</span>
                  <span className="book-tag book-tag-soon">Behavioral finance</span>
                </div>
                <p className="book-soon-note">More details will be shared soon.</p>
              </div>
            </article>
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
            <a href="/#contact" className="btn-gold">
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
