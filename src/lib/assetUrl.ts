/** Resolve public folder paths for the current Vite `base` (e.g. `./` on static hosting). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const p = path.replace(/^\//, '');
  if (base === '/' || base === './') {
    return base === './' ? `./${p}` : `/${p}`;
  }
  return base.endsWith('/') ? `${base}${p}` : `${base}/${p}`;
}
