require('dotenv').config();

import express from 'express';
import fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const init = async () => {
  const port = `${process.env.port}`;
  const app = express();
  let server: https.Server | http.Server;

  // Only because we're running direct 
  if (process.env.usessl === 'true') {
    const cert = fs.readFileSync(`${process.env.sslcert}`);
    const key = fs.readFileSync(`${process.env.sslkey}`);
    console.log('cert', cert.buffer.byteLength, key.toString());
    const ssloptions: any = {
      key: fs.readFileSync(`${process.env.sslkey}`),
      cert: fs.readFileSync(`${process.env.sslcert}`),
      ca: fs.readFileSync(`${process.env.sslca}`),
    };
    server = https.createServer(ssloptions, app);
  } else {
    server = http.createServer(app);
  }

  app.use(cookieParser());
  app.use(bodyParser.json()); // acepta json
  app.get(`/health`, async (req, res) =>  res.json({ status: `it's aliiIIIiiiive!`, success: true, serverTime: new Date() }));
  
  console.log(`using port ${port}`)
  app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
  });
};
init();