// ==UserScript==
// @name          Easy Street View Screen Shot.
// @description   Right click for easy screen shots in street view. 
// @version       0.1
// @author        echandler
// @match         https://www.geoguessr.com/*
// @license       MIT
// @namespace     Easy GeoGuessr screen shot.
// @grant         none
// @downloadURL   https://github.com/echandler/Easy-GeoGuessr-Street-View-Screen-Shot./raw/main/easyScreenShot.user.js
// @updateURL     https://github.com/echandler/Easy-GeoGuessr-Street-View-Screen-Shot./raw/main/easyScreenShot.user.js
// ==/UserScript==


let svCanvas = null;

setInterval(()=>{
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach((canvas)=>{
        if (canvas.__$contextmenuFixed) return;

        canvas.__$contextmenuFixed = true;

        // Prevents the contextmenu event from bubbling to the parent where it
        // will be prevented.
        // The contextmenu has an option to save or copy the image.
        canvas.addEventListener('contextmenu', (e) =>{
            e.stopPropagation();
            showMsg();
        });
    });
}, 2000);

document.body.addEventListener('keypress', (e)=>{
    if (e.key != "P" || e.srcElement.nodeName === "INPUT" || e.srcElement.nodeName === "TEXTAREA") return;

    if (svCanvas === null){
        svCanvas = document.body.querySelector(`[aria-label="Street View"]`)?.firstElementChild;
        if (!svCanvas){
            alert(`Something happened with the "Easy GeoGuessr Street View Screen Shot" script.`);
            return;
        }

        svCanvas._svSibling = svCanvas?.nextElementSibling;
        if (!svCanvas._svSibling){
            alert(`Something happened with the "Easy GeoGuessr Street View Screen Shot" script.`);
            return;
        }

        svCanvas._svZIndex = svCanvas.style.zIndex;
    }

    if (document.body.lastChild === svCanvas){
        // Restores the default position of the street view canvas element.
        svCanvas._svSibling.before(svCanvas);
        svCanvas.style.zIndex = svCanvas._svZIndex;
        return;
    }

    // Makes the street view canvas the last element of the body.
    document.body.lastChild.after(svCanvas);
    svCanvas.style.zIndex = "999999";
});

function showMsg(){
    const bodyDiv = document.createElement('div');
    bodyDiv.style.cssText = "";
    bodyDiv.innerHTML = `
        <div class="_text-animation" style='position: absolute; '>Easy Street View Screen Shot! Keyboard shortcut: shift-p (capital P).</div>
    `;
    document.body.appendChild(bodyDiv);
    setTimeout(()=> bodyDiv.remove(), 5000);
}


document.head.insertAdjacentHTML('beforeend', `
    <style>
        
        ._text-animation {
            color: transparent;
            position: absolute; 
            bottom: 1em; 
            left: 2em; 
            width: fit-content;
            background: linear-gradient(90deg, transparent 0%,rgba(0, 212, 255, 1) 1%);
            background-size: 200% 100%;
            background-repeat: no-repeat;
            background-clip: text;
            animation: animateText 5s; 
            animation-fill-mode: forwards;
            z-index: 999999;
        }

        @keyframes animateText {
            0% {
                 background-position: -100% 0%;
            }
            40% {
                 background-position: 5% 0%;
            }
            60% {
                 background-position: 5% 0%;
            }
            100% {
                 background-position: 200% 0%;
            }
        }
    </style>
    `);
