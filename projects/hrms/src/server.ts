import * as dotenv from 'dotenv';
dotenv.config();

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { addTRPC } from '@hrms-server/trpc-express';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Serve static files from /browser
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
    setHeaders: (res) => {
      const headers = angularApp.getPrerenderHeaders(res.req);
      for (const [key, value] of headers) {
        res.setHeader(key, value);
      }
    },
  }),
);

app.get('**', (req, res, next) => {
  angularApp
    .render(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

addTRPC(app);

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default createNodeRequestHandler(app);
