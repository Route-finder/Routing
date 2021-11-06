const lc = require('lc_call_number_compare');

function skip_shelves(path, lower, booklocs) {
    for (let i = 0; i < path.length; i++) {
	let [upper, dist] = [path[i]["upper-bound"], path[i]["distance"]];

	console.log(booklocs.find(code => lc.lt(code, upper) && lc.gt(code, lower)), "a")
    }
}


let a = [
    {"upper-bound": "M7", "distance": 7}, 
    {"upper-bound": "M80", "distance": 2}
];

let books = ["M2", "M9"];

skip_shelves(a, "M1", books)
