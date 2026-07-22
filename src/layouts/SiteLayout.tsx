import { Outlet } from 'react-router-dom';
import { SiteFooter } from '../components/SiteFooter';
import { TopbarNav } from '../components/TopbarNav';

export function SiteLayout() {
  return (
    <>
      <TopbarNav />
      <Outlet />
      <SiteFooter />
    </>
  );
}
