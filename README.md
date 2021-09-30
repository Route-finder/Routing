# Store Shopping Project

## Description

### Primary Aim
The aim of this project is to create a web-based service which allows for a quicker and more
efficient way to traverse a store, or similar environment. Specifically, this app will be a
shopping list, with the feature of giving you both:
 * The most efficient (based on distance to walk) order in which to pick up items
 * A visual pathway to follow through the store, library, etc.

This idea builds on existing services from department stores, adding what we believe to be a
key feature of navigation around the store. Existing apps from Walmart and others *do* show 
item locations, but it is then up to customers to find their way to each point on that map.

### Other Domains
In addition to use in a setting like a department store, we also envision that this app (or
at least its foundation) could be used in a variety of environments. Isaac works at the
circulation desk at Preus Library here at Luther, and I could see this app being extended so
that, with a list of item call numbers, it would generate an order in which to shelve books,
and a map showing that optimal path.

More generally, this project has the potential to be quite modular: ideally, it would be able
to, given a mapping of locations, and a database of items tagged with locations in that map,
provide a visual and listed optimal path between those items. This is something we may explore
in Spring, depending on time available.

## Structure
- How will the project be organized?
  - [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) setup (as in CS330)
  - More generally, developed in 3 domains: Frontend, Backend, Database
- How broad or narrow should the focus be?
  - Start small and broaden, adding features once we have MVP

## Languages and Technologies
- Platform: Web App
- Database: Could go with CS330 and use [sqlite3 w/Python](https://www.tutorialspoint.com/sqlite/sqlite_python.htm) on backend
- Languages to be used:
  - HTML/CSS: Consider using [Jinja templates](https://jinja.palletsprojects.com/en/3.0.x/) and a CSS framework
  - JavaScript: [Vue.js](https://vuejs.org/) if comfortable for some frontend, "vanilla" for backend

## Practicalities
- Scalability
  - Begin work with small dataset, scale up
- Partnerships
  - Local stores?

## Timeline

# Node information

A barebones Node.js app using [Express 4](http://expressjs.com/).

Built with [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

Current development version [is here](https://pacific-tundra-51714.herokuapp.com/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```
