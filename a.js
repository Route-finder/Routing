const lc = require('lc_call_number_compare');

// path: json from the database for a particular floor
// lower: lower bound (call number)
// booklocs: List of call numbers
//
// No mutation
function keep_shelves_indexes(path, lower, booklocs) {
    let result = [];
    let cost = 0;
    for (let i = 0; i < path.length; i++) {
	let [upper, cost_here] = [path[i]["upper-bound"], path[i]["distance"]];

	cost += cost_here;
	let found = booklocs.find(code => lc.lt(code, upper) && lc.gt(code, lower));

	// If it is found, add it
	if (found !== undefined) {
	    result.push([i, cost]);
	    cost = 0;
	}
    }
    return result
}

let a = [
    {"upper-bound": "M7", "distance": 7}, 
    {"upper-bound": "M80", "distance": 2}
];

let books = ["M2", "M9"];

console.log(keep_shelves_indexes(a, "M1", books))
console.log(keep_shelves_indexes(a, "M5", books))
// console.log(skip_shelf(books, 1))
// console.log(skip_shelf(books, 0))
console.log(a)

