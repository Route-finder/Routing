/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer();
const parser = require('body-parser');

const { body,validationResult } = require('express-validator');

const cool = require('cool-ascii-faces');
const path = require('path');
const lc = require('lc_call_number_compare');
const PORT = process.env.PORT || 3000;

// for parsing application/json
app.use(express.json()); 

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Set the path for web page source files and ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Define the application routes
 *  - Homepage (/)
 *  - Database (/db)
 *  - Route and Book List (/route)
 *  - Adding Books (/add)
 */

// Homepage
app.get('/', (req, res) => res.render('pages/index'));
app.get('/cool', (req, res) => res.send(cool()));

// DB Information - From "Hello World" presentation
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

// Route Information
app.get('/route', async (req, res) => {
  try {
    const client = await pool.connect();
                                                  // Use table name
    const result = await client.query('SELECT * FROM booklist');
    const results = { 'results': (result) ? result.rows : null};
    console.log(results);
    res.render('pages/route', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Adding Books
app.get('/add', (req, res) => {
  let msg = {isbn: ""};
  res.render('pages/add', {msg: msg});
});
app.post('/add', (req, res) => {
  console.log(req.body.isbn);
  // TODO: Submit request to OCLC with ISBN

  // TODO: Add book info (from OCLC response) to Database

  // Placeholder: Print a message
  const msg = {isbn: req.body.isbn + " has been recorded."};
  res.render('pages/add', {msg: msg});
});

// API for React client frontend
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// 404 Route
app.use((req, res) => res.status(404).render('pages/404'));

// Invoke listen method
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
