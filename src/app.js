/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * Based on the Node.js "Hello World" starter code
 * 
 * Initial Work: Isaac List
 */

// Import Node module(s)
import { createServer } from 'http';

// Initialize server
const hostname = '127.0.0.1';
const port = 3000;

// Actually create the server process
const server = createServer((req, res) => {
  // Response given using HTML to a URL
  if (req.url == '/') {
        
    // set response header
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    
    // set response content    
    res.write('<html><body><p>Hello, World!</p></body></html>');
    res.end();
  }

  // Default Node.js Example Response
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
});

// Listen for incoming requests
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
