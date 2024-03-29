/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/server.js
//const fs = require('fs')

import chalk from 'chalk';
import express from 'express';
import fs from 'fs';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import serveStatic from "serve-static";
import cookieParser from 'cookie-parser';
import entryserver from "./dist/server/entry-server.cjs"
import routes from "./src/server/routes.mjs";
import { createServer } from "vite";
import Gun from "gun";

const PORT =  process.env.PORT || 3000;
const HOST = process.env.HOST ||"0.0.0.0";

const manifestjson = JSON.parse(fs.readFileSync("./dist/client/ssr-manifest.json", 'utf8'));
const __dirname = dirname(fileURLToPath(import.meta.url));

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

async function vcreateServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {

  const resolve = (p) => path.resolve(__dirname, p)
  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''
  const manifest = isProd ? manifestjson : {}

  const app = express()
  app.use(express.static('./public'));
  app.use(cookieParser())
  app.use(express.json())
  app.use(routes);

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(compression())
    app.use(
      serveStatic(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      //console.log("INIT RENDER...",isProd);
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.mjs')).render
      } else {
        template = indexProd
        //render = require('./dist/server/entry-server.js').render
        render = entryserver.render
      }
      
      const [appHtml, preloadLinks] = await render(url, manifest)
      
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  vcreateServer().then(({ app }) =>{
      const server = app.listen(PORT, () => {
        console.log(chalk.yellow('Vite.js SSR'))
        console.log(chalk.green(`http://localhost:${PORT}`))
      })
      let gunconfig={
        web:server//server express
      }

      var gun = Gun(gunconfig);

      gun.on('hi', peer => {//peer connect
        //console.log('connect peer to',peer);
        console.log('peer connect!');
      });

      gun.on('bye', (peer)=>{// peer disconnect
        //console.log('disconnected from', peer);
        console.log('disconnected from peer!');
      });

      return app;
    }
  )
}

// for test use
//exports.vcreateServer = vcreateServer
export {
  vcreateServer
}