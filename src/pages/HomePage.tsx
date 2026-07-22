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
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, '');
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

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
