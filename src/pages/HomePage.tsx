import { useState } from 'react';
import { BooksNewsletter } from '../components/BooksNewsletter';
import { ContactSection } from '../components/ContactSection';
import { FullTeamOverlay } from '../components/FullTeamOverlay';
import { MainScrollSections } from '../components/MainScrollSections';
import { SiteFooter } from '../components/SiteFooter';
import { TeamBlock } from '../components/TeamBlock';
import { TestimonialsBlock } from '../components/TestimonialsBlock';
import { TopbarNav } from '../components/TopbarNav';
import { useGsmRevealAndCount } from '../hooks/useGsmRevealAndCount';

export function HomePage() {
  const [fullTeamOpen, setFullTeamOpen] = useState(false);
  useGsmRevealAndCount();

  return (
    <>
      <TopbarNav />
      <MainScrollSections />
      <TeamBlock onOpenFullTeam={() => setFullTeamOpen(true)} />
      <FullTeamOverlay open={fullTeamOpen} onClose={() => setFullTeamOpen(false)} />
      <TestimonialsBlock />
      <BooksNewsletter />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
