const lc = require('lc_call_number_compare');

// path: json from the database for a particular floor
// lower: lower bound (call number)
// booklocs: List of call numbers
function keep_shelves_indexes(path, booklocs) {
    let result = [];
    let cost = 0;
    for (let i = 0; i < path.length; i++) {
	let [lower, upper, cost_here] = [path[i]["lower-bound"], path[i]["upper-bound"], path[i]["distance"]];

	cost += cost_here;
	let found = booklocs.find(code => lc.lt(code, upper) && lc.gt(code, lower));

	// If there is a code in this shelf we need, add it
	if (found !== undefined) {
	    result.push([lower, upper, cost]);
	    cost = 0;
	}
    }
    result.push(["START", "START", cost])
    return result
}

// path: List<(min, max, cost)>
function shortest(path) {
    return path.reduce((old, ne) => old[2] < ne[2] ? old : ne)
}

let a = [
    {"lower-bound": "A1", "upper-bound": "B100", "distance": 123},
    {"lower-bound": "B300", "upper-bound": "D24", "distance": 2},
    {"lower-bound": "E33", "upper-bound": "F9", "distance": 2},
    {"lower-bound": "M1", "upper-bound": "M7", "distance": 7},
    {"lower-bound": "M7", "upper-bound": "M80", "distance": 2},
    {"lower-bound": "Z7", "upper-bound": "Z80", "distance": 2}
];

let books = ["M2", "M9"];
let books2 = ["M9"];

console.log(keep_shelves_indexes(a, books))
console.log(shortest(keep_shelves_indexes(a, books)))
console.log("\n")
console.log(keep_shelves_indexes(a, books2))
console.log(shortest(keep_shelves_indexes(a, books2)))
