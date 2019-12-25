import fs from 'fs';
import path from 'path';
import express from 'express';
import serveIndex from 'serve-index';

import args from './args.js';
import {say} from './common.js';

const SITE_PATH = path.join(__dirname, 'public');
export const libraryPath = args.libraryPath || path.join(__dirname, 'public', 'library');

const app = express();

let upAt;

const LibraryServer = {
  start
}

export default LibraryServer;

async function start({server_port}) {
  addHandlers();
  app.listen(Number(server_port), err => {
    if ( err ) { 
      throw err;
    } 
    upAt = new Date;
    say({server_up:{upAt,server_port}});
  });
}

function addHandlers() {
  app.use(express.static(SITE_PATH));
  if ( !! libraryPath ) {
    app.use("/library", express.static(libraryPath), serveIndex(libraryPath, {icons:true}));
  }
}

