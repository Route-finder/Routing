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
const http = require('http');

// Initialize server
const hostname = '127.0.0.1';
const port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// Actually create the server process
const server = http.createServer((req, res) => {
  // Response given using HTML to a URL
  if (req.url == '/') {
        
    // set response header
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
    
    html = "<html><head><title>Hello World!</title></head>\
            <body><h1>Hello, World!</h1></body></html>"

    // set response content    
    res.write(html);
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

// PostgreSQL Database Access
// const { Client } = require('pg');

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'testdb',
//     password: '',
//     port: 5432,
// });

// client.connect();
