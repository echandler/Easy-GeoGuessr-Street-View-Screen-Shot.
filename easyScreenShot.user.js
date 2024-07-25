// ==UserScript==
// @name          Easy GeoGuessr Street View Screen Shot.
// @description   Brings street view to the front so that you can easily take a screen shot.
// @version       0.1
// @author        echandler
// @match         https://www.geoguessr.com/*
// @run-at        document-start
// @license       MIT
// @namespace     Easy GeoGuessr screen shot.
// @grant         none
// @downloadURL   https://github.com/echandler/Easy-GeoGuessr-Street-View-Screen-Shot/raw/main/easyScreenShot.user.js
// @updateURL     https://github.com/echandler/Easy-GeoGuessr-Street-View-Screen-Shot/raw/main/easyScreenShot.user.js
// ==/UserScript==


let svCanvas = null;
let svSibling = null;
let svZIndex = null;

document.body.addEventListener('keypress', (e)=>{
    if (e.key != "P") return;

    if (svCanvas === null){
        svCanvas = document.body.querySelector(`[aria-label="Street View"]`)?.firstElementChild;
        if (!svCanvas){
            alert(`Something happened with the "Easy GeoGuessr Street View Screen Shot" script.`);
            return;
        }

        svSibling = svCanvas?.nextElementSibling;
        if (!svSibling){
            alert(`Something happened with the "Easy GeoGuessr Street View Screen Shot" script.`);
            return;
        }

        svZIndex = svCanvas.style.zIndex;
    }

    if (document.body.lastChild === svCanvas){
        // Restores the default position of the street view canvas element.
        svSibling.before(svCanvas);
        svCanvas.style.zIndex = svZIndex;
        return;
    }

    // Makes the street view canvas the last element of the body.
    document.body.lastChild.after(svCanvas);
    svCanvas.style.zIndex = "999999";
});
