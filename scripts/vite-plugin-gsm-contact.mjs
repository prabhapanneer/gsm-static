/**
 * Serves POST /contact and GET /__smtp-check in Vite dev (same port as the app).
 * Loads contact-server/.env for SMTP. Production builds do not use this.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import dotenv from 'dotenv';
import { registerGsmContactRoutes } from '../contact-server/gateway.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

let envLoaded = false;

function loadEnv() {
  if (envLoaded) return;
  envLoaded = true;
  dotenv.config({ path: path.join(projectRoot, 'contact-server', '.env') });
  dotenv.config({ path: path.join(projectRoot, 'contact-server', '.env.local'), override: true });
}

/**
 * @returns {import('vite').Plugin}
 */
export function gsmContactPlugin() {
  const api = express();
  let routesInited = false;
  const serversBound = new WeakSet();

  return {
    name: 'gsm-contact-api',
    apply: 'serve',
    enforce: 'pre',
    configureServer(server) {
      if (!routesInited) {
        loadEnv();
        registerGsmContactRoutes(api, { rootInfo: false });
        routesInited = true;
      }
      if (serversBound.has(server)) return;
      serversBound.add(server);
      server.middlewares.use((req, res, next) => {
        const u = req.url || '';
        const pathname = u.split('?')[0] || '';
        if (pathname === '/contact' || pathname === '/__smtp-check') {
          return api(req, res, (err) => {
            if (err) return next(err);
            if (!res.writableEnded && !res.headersSent) return next();
          });
        }
        next();
      });
    },
  };
}
