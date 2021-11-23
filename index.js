/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import express, { json, urlencoded } from 'express';
const app = express();

import multer from 'multer';
const upload = multer();

import { body, validationResult } from 'express-validator';

import cool from 'cool-ascii-faces';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import lc from 'lc_call_number_compare';
const PORT = process.env.PORT || 3000;

// for parsing application/json
app.use(json()); 

// for parsing application/xwww-form-urlencoded
app.use(urlencoded({ extended: false })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Set the path for web page source files and ejs engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

import pg from 'pg';
const pool = new pg.Pool({
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
 *  - Adding Books (/add) GET and POST
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
    const result = await client.query('SELECT * FROM booklist ORDER BY call_no');
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
  let result = null;
  res.render('pages/add', {result: result});
});
app.post('/add', async (req, res) => {
  // Submit request to OCLC with ISBN
  console.log(req.body.isbn);
  let oclc_obj = classify.get(req.body.isbn);
  console.log(oclc_obj);

  let item = {
    isbn: req.body.isbn,
    title: "",
    author: "",
    pub_date: "",
    call_no: ""
  };

  /*
  // Add book info (from OCLC response) to Database
  const client = await pool.connect();
  const text = "INSERT INTO booklist() VALUES($1, $2, $3, $4, $5) RETURNING *";
  const values = [item.isbn, "", "", "", ""];

  try {
    const res = await client.query(text, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }*/

  // Placeholder: Print a message
  const result = {isbn: req.body.isbn};
  res.render('pages/add', {result: result});
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

/**
 * Auxilary Functions
 * - skip_shelves
 */

// path: Array of (upper bound (LOC code), distance)
// initial: LOC code
function skip_shelves(path, initial) {
    for (let i in skip_shelves) {
	let [upper, dist] = path[i];
    }
}
