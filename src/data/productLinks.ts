/** Product SPA paths (shared header/footer via SiteLayout). */
export const PRODUCT_LINKS = [
  { to: '/mutual-funds', label: 'Mutual Funds', menuLabel: '📈 Mutual Funds' },
  { to: '/insurance', label: 'Insurance', menuLabel: '🛡️ Insurance' },
  { to: '/fixed-deposits-bonds', label: 'FDs & Bonds', menuLabel: '🏦 FDs & Bonds' },
  { to: '/capital-gain-tax-saving', label: 'Capital Gain Tax Saving', menuLabel: '🏠 Capital Gain Tax Saving' },
  { to: '/nri-investment-services', label: 'NRI Investment Services', menuLabel: '✈️ NRI Investment Services' },
  { to: '/aif-pms-sif', label: 'AIF, PMS & SIF', menuLabel: '🌐 AIF, PMS & SIF' },
  { to: '/real-estate', label: 'Real Estate', menuLabel: '🏙️ Real Estate' },
] as const;

export const PRODUCT_SLUGS = PRODUCT_LINKS.map((p) => p.to.replace(/^\//, ''));
