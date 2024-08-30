import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import App from './src/App.js';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {
    const appString = ReactDOMServer.renderToString(React.createElement(App));
      
      // Replace a placeholder in the HTML with the rendered React component
      return res.send(appString);
    });
  
  
  app.use(express.static('./build'));
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
