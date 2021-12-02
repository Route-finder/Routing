/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const request = require('request');
const xml2js = require('xml2js').parseString;

const ENDPOINT = "http://classify.oclc.org/classify2/Classify?summary=true&isbn=";
const sec_ep = "http://classify.oclc.org/classify2/Classify?summary=true&owi=";

///////////////////////////////

const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer();

const { body, validationResult } = require('express-validator');

const cool = require('cool-ascii-faces');
const path = require('path');

// const classify = require('../classify');

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
  let book = {
    isbn: req.body.isbn,
    title: "",
    author: "",
    call_no: ""
  };

  getRequest(req.body.isbn, ENDPOINT, function (data) {
    book.title = data.title;
    book.author = data.author;
    book.call_no = data.congress;
  });

  console.log("book:", book);


  // Add book info (from OCLC response) to Database
  const client = await pool.connect();
  const text = "INSERT INTO booklist() VALUES($1, $2, $3, $4, $5) RETURNING *";
  const values = [item.isbn, item.author, item.title, item.call_no];

  try {
    const res = await client.query(text, values)
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }

  // Placeholder: Print a message
  const result = {isbn: req.body.isbn};
  res.render('pages/add', {result: result});
});

// API for React client frontend
app.get('/api', async (req, res) => {
  if (req.body.msg = "list") {
    try {
      const client = await pool.connect();
                                                    // Use table name
      const result = await client.query('SELECT * FROM booklist ORDER BY call_no');
      const results = { 'results': (result) ? result.rows : null};
      console.log(results);
      // res.render('pages/route', results );
      client.release();
    } catch (err) {
      console.error(err);
      // res.send("Error " + err);
    }
    res.json(results);
  }
  else if (req.body.msg = "search") {
    
  }

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
 * - getRequest
 */

// path: Array of (upper bound (LOC code), distance)
// initial: LOC code
function skip_shelves(path, initial) {
    for (let i in skip_shelves) {
	let [upper, dist] = path[i];
    }
}

function getRequest(identifier, endpoint, callback) {
  request({
    url: endpoint + identifier,
    json: true,
    headers: {
      'User-Agent': 'npm-classify2'
    }
  },
  function (error, response, body) {
    if (error) {
      callback(null);
    }

    xml2js(body, function (err, result) {
      let code = result.classify.response[0]["$"].code;
      if (code == 4) {
        let owi = result.classify.works[0].work[0]["$"].owi;
        getRequest(owi, sec_ep, callback);
      }
      
      else {
        result = result.classify;

        let response = {};
        try {
          response.status = result.response[0]['$'].code,
          response.owi = result.work[0]["$"].owi
          response.author = result.work[0]["$"].author;
          response.title = result.work[0]["$"].title;
          response.dewey = result.recommendations[0].ddc[0].mostPopular[0]['$'].sfa,
          response.congress = result.recommendations[0].lcc[0].mostPopular[0]['$'].sfa
        } catch (e) {
          console.log("Encountered an Error");
        }
        callback(response)
      }
    })
  }
  )
}
