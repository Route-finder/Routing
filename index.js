/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const express = require('express');
const app = express();

var multer = require('multer');
var upload = multer();

const cool = require('cool-ascii-faces');
const path = require('path');
const lc = require('lc_call_number_compare');
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

// for parsing application/json
app.use(express.json()); 

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Define the application routes
app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    console.log(results);
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get('/add', (req, res) => {
  let msg = {msg1: "Hello"};
  res.render('pages/add', {msg: msg});
});
app.post('/add', (req, res) => {
  console.log(req.body);
  const msg = req.body;
  res.send("Message Received :D" + msg);
});

// API for React client frontend
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// 404 Route
app.use((req, res) => res.status(404).render('pages/404'));
