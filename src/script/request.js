/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * Exploring the use of both API options for finding book classification.
 * 
 * Written by Isaac List in September 2021
 */

/**
 * Library of Congress uses a JSON-supplying API, accessible 
 * through a more contemporary requests setup
 */
async function requestinfo(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(function() {
        console.log("An error occurred");
    });
}

async function loc() {
    // Get search term provided by user
    let searchbox = document.getElementById("isbn");
    let term = searchbox.value;

    let url = "https://www.loc.gov/search/?q=" + term + "&fo=json";

    let information = await requestinfo(url);
    console.log(information);
}

/**
 * OCLC's "Classify2" uses a RESTful API supplying XML-formatted data
 * 
 * Note that this code would have to be run on the
 * back-end, due to CORS restrictions. Consider this
 * an example of the URL parameter(s) and thus the
 * information we would need from the user.
 */
function classify() {
    // Get ISBN provided by user
    let searchbox = document.getElementById("isbn");
    let isbn = searchbox.value;

    const request = new XMLHttpRequest();
    let baseURL = "http://classify.oclc.org/classify2/Classify?";

    let url = baseURL + "isbn=" + isbn + "&summary=true";

    request.open("GET", url);
    request.send();

    request.onload = (e) => {
        console.log(request.response);
    }
}

function main() {
    let locbutton = document.getElementById("loc");
    locbutton.addEventListener("click", loc);

    let oclcbutton = document.getElementById("oclc");
    oclcbutton.addEventListener("click", classify);
}

window.onload = main;
