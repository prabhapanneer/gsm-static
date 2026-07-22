import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_SLUGS } from '../data/productLinks';
import productPages from '../data/productPages.json';
import '../styles/product-article.css';

type ProductEntry = {
  slug: string;
  title: string;
  documentTitle: string;
  html: string;
};

const pages = productPages as Record<string, ProductEntry>;

const PRODUCT_PATHS = new Set(PRODUCT_SLUGS.map((s) => `/${s}`));

export function ProductPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const page = PRODUCT_SLUGS.includes(slug) ? pages[slug] : undefined;

  useEffect(() => {
    if (!page) return;
    document.title = page.documentTitle;
    window.scrollTo(0, 0);
    const links = document.querySelectorAll<HTMLAnchorElement>('.product-article .quick-links a');
    links.forEach((a) => {
      const href = a.getAttribute('href');
      a.classList.toggle('is-active', href === `/${page.slug}`);
    });
    return () => {
      document.title = 'GSM Investment Services | Trusted Financial Guidance Since 2003';
    };
  }, [page]);

  if (!page) {
    return (
      <div className="product-article" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <article className="product-article">
      <div
        dangerouslySetInnerHTML={{ __html: page.html }}
        onClick={(e) => {
          const a = (e.target as HTMLElement).closest('a');
          if (!a) return;
          const href = a.getAttribute('href');
          if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
          }
          if (href.startsWith('/#')) {
            e.preventDefault();
            navigate({ pathname: '/', hash: href.slice(2) });
            return;
          }
          if (href === '/') {
            e.preventDefault();
            navigate('/');
            return;
          }
          const path = href.split('?')[0];
          if (PRODUCT_PATHS.has(path)) {
            e.preventDefault();
            navigate(href);
          }
        }}
      />
    </article>
  );
}
