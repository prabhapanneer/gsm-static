import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          {/* Legacy static filenames → SPA routes (must be before :slug) */}
          <Route path="mutual-funds_v12.html" element={<Navigate to="/mutual-funds" replace />} />
          <Route path="insurance-planning_v12.html" element={<Navigate to="/insurance" replace />} />
          <Route path="fixed-deposits-bonds_v12.html" element={<Navigate to="/fixed-deposits-bonds" replace />} />
          <Route path="capital-gain-tax-saving_v12.html" element={<Navigate to="/capital-gain-tax-saving" replace />} />
          <Route path="nri-investment-services_v12.html" element={<Navigate to="/nri-investment-services" replace />} />
          <Route path="aif-pms-sif_v12.html" element={<Navigate to="/aif-pms-sif" replace />} />
          <Route path="real-estate_v12.html" element={<Navigate to="/real-estate" replace />} />
          <Route path=":slug" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
