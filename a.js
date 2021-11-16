const lc = require('lc_call_number_compare');

// path: json from the database for a particular floor
// lower: lower bound (call number)
// booklocs: List of call numbers
//
// No mutation
function keep_shelves_indexes(path, lower, booklocs) {
    let result = [];
    for (let i = 0; i < path.length; i++) {
	let [upper, _] = [path[i]["upper-bound"], path[i]["distance"]];

	let found = booklocs.find(code => lc.lt(code, upper) && lc.gt(code, lower));
	if (found === undefined) {
	    result.push(i)
	} else {
	}
    }
    return result
}

// path: json from the database for a particular floor
// skip_idx: index of path to skip
//
// Returns a new booklocs with that index skipped, and the distance updated
function skip_shelf(path, skip_idx) {
    // Clone the path
    let result = path.map(x => x);
    console.log(result, "a");
    result[skip_idx-1]["distance"] += result[skip_idx]["distance"]
    console.log(result, "b");
    result.remove(skip_idx)
    return result
}

let a = [
    {"upper-bound": "M7", "distance": 7}, 
    {"upper-bound": "M80", "distance": 2}
];

let books = ["M2", "M9"];

console.log(keep_shelves_indexes(a, "M1", books))
console.log(keep_shelves_indexes(a, "M5", books))
skip_shelf(books, 1)
console.log(a)

