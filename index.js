/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const express = require('express');
const app = express();

const cool = require('cool-ascii-faces');
const path = require('path');
const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Invoke listen method
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

// Set the path for web page source files and ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define the application routes
app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get('/classify', (req, res) => res.render('pages/classification'));

// API for React client frontend
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// 404 Route
app.use((req, res) => res.status(404).render('pages/404'));

function classify() {
  // Get ISBN provided by user
  // let searchbox = document.getElementById("isbn");
  // let isbn = searchbox.value;

  let isbn = 9781101972083;

  const request = new XMLHttpRequest();
  let baseURL = "http://classify.oclc.org/classify2/Classify?";

  let url = baseURL + "isbn=" + isbn + "&summary=true";

  request.open("GET", url);
  request.send();

  request.onload = (e) => {
    console.log(request.response);
    resp = request.response;
  }

  return resp;
}