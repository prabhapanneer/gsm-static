import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BooksNewsletter } from '../components/BooksNewsletter';
import { ContactSection } from '../components/ContactSection';
import { FullTeamOverlay } from '../components/FullTeamOverlay';
import { MainScrollSections } from '../components/MainScrollSections';
import { TeamBlock } from '../components/TeamBlock';
import { TestimonialsBlock } from '../components/TestimonialsBlock';
import { useGsmRevealAndCount } from '../hooks/useGsmRevealAndCount';

export function HomePage() {
  const [fullTeamOpen, setFullTeamOpen] = useState(false);
  const location = useLocation();
  useGsmRevealAndCount();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const id = location.hash.replace(/^#/, '');
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    // Defer until layout is ready so hash targets (e.g. #books) do not race the first paint.
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash, location.key]);

  return (
    <>
      <MainScrollSections />
      <TeamBlock onOpenFullTeam={() => setFullTeamOpen(true)} />
      <FullTeamOverlay open={fullTeamOpen} onClose={() => setFullTeamOpen(false)} />
      <TestimonialsBlock />
      <BooksNewsletter />
      <ContactSection />
    </>
  );
}
