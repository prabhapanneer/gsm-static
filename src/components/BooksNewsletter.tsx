import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';

const books = [
  {
    title: 'Retire Early Through Mutual Funds',
    cover: 'img-647c72e6302c.png',
    alt: 'Retire Early Through Mutual Funds book cover',
    sub: 'A focused take on using mutual funds with discipline to move toward financial independence.',
    tags: ['Mutual funds', 'Retirement'],
    href: 'https://notionpress.com/in/read/retire-early-through-mutual-funds',
  },
  {
    title: 'Goal Based Financial Case Studies',
    cover: 'img-fdd4179b489d.png',
    alt: 'Goal Based Financial Case Studies book cover',
    sub: 'Real-life goal-based examples that help connect money decisions to meaningful outcomes.',
    tags: ['Goal-based planning', 'Case studies'],
    href: 'https://notionpress.com/in/read/goal-based-financial-case-studies',
  },
  {
    title: 'Kurukshetra of Investing',
    cover: 'book-kurukshetra.jpg',
    alt: 'Kurukshetra of Investing book cover',
    sub: 'Investing behaviour, discipline, and clarity, explored through a more thoughtful lens.',
    tags: ['Behavioral finance', 'Investing mindset'],
    href: 'https://notionpress.com/in/read/kurukshetra-of-investing',
  },
] as const;

export function BooksNewsletter() {
  return (
    <>
      <section className="books" id="books">
        <div className="si">
          <div className="books-head">
            <div className="ceo-pic-wrap reveal">
              <img
                src={assetUrl('assets/images/team/vishal.jpg')}
                alt="Vishal Muralidharan"
                className="ceo-pic"
              />
            </div>
            <div className="books-copy">
              <div className="stag">
                <span className="stag-line" />
                <span className="stag-text">Author Spotlight</span>
              </div>
              <h2 className="sh books-heading">Books by Our CBO</h2>
              <p className="books-lead">
                Written by Vishal Muralidharan, these books are designed to make financial thinking simpler, more
                practical, and more meaningful in real life.
              </p>
              <p className="sdesc">
                From mutual funds and retirement thinking to goal-based financial decision-making, the aim is to
                explain important ideas in a way that feels clear, usable, and easy to connect with.
              </p>
            </div>
          </div>

          <div className="books-grid">
            {books.map((book) => (
              <article className="book-card reveal" key={book.title}>
                <div className="book-cover-wrap">
                  <img src={assetUrl(`assets/images/${book.cover}`)} alt={book.alt} className="book-cover" />
                </div>
                <div className="book-body">
                  <div className="book-label">Published</div>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-sub">{book.sub}</p>
                  <div className="book-meta">
                    {book.tags.map((tag) => (
                      <span className="book-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="book-link" href={book.href} target="_blank" rel="noopener noreferrer">
                    Purchase on Notion Press →
                  </a>
                </div>
              </article>
            ))}
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
              Receive curated insights on mutual funds, financial planning, market updates, and practical tips,
              written in simple language, delivered monthly.
            </p>
          </div>
          <div className="newsletter-actions">
            <Link to="/newsletter" className="btn-gold">
              View Our Issues →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
