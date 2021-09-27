/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * Based on the express.js "Hello World" starter code
 * 
 * Initial Work: Isaac List
 */

const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/www/apitest.html");
});