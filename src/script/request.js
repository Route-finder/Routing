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
    .then(json => printData(json))
    .catch(function() {
        console.log("An error occurred");
    });
}

function printData(data) {
    console.log(data);
}

async function loc() {
    let url = "https://www.loc.gov/item/ihas.200196396/?fo=json";

    let information = await requestinfo(url);
    console.log(information);
}

/**
 * OCLC's "Classify2" uses a RESTful API supplying XML-formatted data
 */
function classify() {
    const request = new XMLHttpRequest();
    let baseURL = "http://classify.oclc.org/classify2/Classify?";

    let url = baseURL + "isbn=0679442723&summary=true";

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

main();
