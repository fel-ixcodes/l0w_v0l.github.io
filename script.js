window.addEventListener("DOMContentLoaded", () => {

/* =========================
   INTRO
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const intro =
            document.getElementById("introScreen");

        if(intro){

            intro.classList.add("hide");

        }

    }, 3000);

});

/* =========================
   ELEMENTS
========================= */

const browserWindow =
    document.getElementById("browserWindow");

const browserFrame =
    document.getElementById("browserFrame");

const settingsPanel =
    document.getElementById("settingsPanel");

const canvas =
    document.getElementById("rain");

/* =========================
   SEARCH
========================= */

function searchWeb(){

    const input =
        document.getElementById("searchInput");

    if(!input) return;

    const query =
        input.value.trim();

    if(!query) return;

    openBrowserApp();

    loadInternalPage(query);

}

window.searchWeb = searchWeb;

/* =========================
   BROWSER WINDOW
========================= */

function openBrowserApp(){

    if(browserWindow){

        browserWindow.style.display =
            "flex";

    }

}

window.openBrowserApp = openBrowserApp;

function closeBrowser(){

    if(browserWindow){

        browserWindow.style.display =
            "none";

    }

}

window.closeBrowser = closeBrowser;

function minimizeBrowser(){

    if(browserWindow){

        browserWindow.style.display =
            "none";

    }

}

window.minimizeBrowser = minimizeBrowser;

/* =========================
   INTERNAL PAGE SYSTEM
========================= */

function loadInternalPage(query){

    if(!browserFrame) return;

    browserFrame.src =
        "data:text/html;charset=utf-8," +
        encodeURIComponent(`

        <html>
        <head>

        <style>

        body{

            margin:0;

            background:#111;

            color:white;

            font-family:Arial,sans-serif;

            padding:60px;
        }

        h1{

            font-size:54px;
        }

        .card{

            margin-top:24px;

            padding:24px;

            border-radius:22px;

            background:#1b1b1b;

            border:1px solid #2d2d2d;
        }

        p{

            opacity:0.75;

            line-height:1.6;
        }

        </style>

        </head>

        <body>

            <h1>${query}</h1>

            <div class="card">

                <h2>Browser App Active</h2>

                <p>
                    Internal browser system loaded successfully.
                </p>

            </div>

            <div class="card">

                <h2>Search Results</h2>

                <p>
                    Future updates can include bookmarks,
                    widgets, notes, apps, and games.
                </p>

            </div>

        </body>
        </html>

        `);

}

/* =========================
   TOOLBAR
========================= */

function browserNavigate(){

    const input =
        document.getElementById("browserSearch");

    if(!input) return;

    const query =
        input.value.trim();

    if(!query) return;

    loadInternalPage(query);

}

window.browserNavigate = browserNavigate;

function browserRefresh(){

    try{

        browserFrame.contentWindow
        .location.reload();

    }catch(e){}

}

window.browserRefresh = browserRefresh;

function browserBack(){

    try{

        browserFrame.contentWindow
        .history.back();

    }catch(e){}

}

window.browserBack = browserBack;

function browserForward(){

    try{

        browserFrame.contentWindow
        .history.forward();

    }catch(e){}

}

window.browserForward = browserForward;

/* =========================
   HOME
========================= */

function goHome(){

    closeBrowser();

}

window.goHome = goHome;

/* =========================
   SETTINGS
========================= */

function toggleSettings(){

    if(settingsPanel){

        settingsPanel.classList.toggle(
            "active"
        );

    }

}

window.toggleSettings = toggleSettings;

function toggleDropdown(id, button){

    const dropdown =
        document.getElementById(id);

    if(dropdown){

        dropdown.classList.toggle(
            "active"
        );

    }

    if(button){

        button.classList.toggle(
            "active"
        );

    }

}

window.toggleDropdown = toggleDropdown;

/* =========================
   EFFECTS
========================= */

if(canvas){

    const ctx =
        canvas.getContext("2d");

    function resizeCanvas(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    let effectMode = "rain";

    const rainDrops = [];

    const particles = [];

    /* RAIN */

    function createRain(){

        rainDrops.length = 0;

        for(let i = 0; i < 700; i++){

            rainDrops.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                length:
                    Math.random() * 20 + 5,

                speed:
                    Math.random() * 7 + 3,

                opacity:
                    Math.random() * 0.5 + 0.1

            });

        }

    }

    /* PARTICLES */

    function createParticles(){

        particles.length = 0;

        for(let i = 0; i < 140; i++){

            particles.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                radius:
                    Math.random() * 3 + 1,

                speedX:
                    (Math.random()-0.5)*0.8,

                speedY:
                    (Math.random()-0.5)*0.8,

                opacity:
                    Math.random() * 0.5 + 0.2

            });

        }

    }

    setTimeout(() => {

        createRain();

        createParticles();

    }, 1600);

    /* APPLY SETTINGS */

    function applySettings(){

        const mode =
            document.getElementById(
                "effectMode"
            );

        if(mode){

            effectMode = mode.value;

        }

    }

    window.applySettings =
        applySettings;

    /* ANIMATION */

    function animate(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* RAIN */

        if(effectMode === "rain"){

            rainDrops.forEach(drop => {

                ctx.beginPath();

                ctx.moveTo(
                    drop.x,
                    drop.y
                );

                ctx.lineTo(
                    drop.x,
                    drop.y + drop.length
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${drop.opacity})`;

                ctx.stroke();

                drop.y += drop.speed;

                if(drop.y > canvas.height){

                    drop.y = -20;

                    drop.x =
                        Math.random() *
                        canvas.width;

                }

            });

        }

        /* PARTICLES */

        else if(
            effectMode === "particles"
        ){

            particles.forEach(p => {

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255,255,255,${p.opacity})`;

                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if(p.x < 0)
                    p.x = canvas.width;

                if(p.x > canvas.width)
                    p.x = 0;

                if(p.y < 0)
                    p.y = canvas.height;

                if(p.y > canvas.height)
                    p.y = 0;

            });

        }

        requestAnimationFrame(
            animate
        );

    }

    animate();

    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createRain();

            createParticles();

        }
    );

}

/* =========================
   ENTER KEY
========================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );

if(searchInput){

    searchInput.addEventListener(
        "keypress",
        function(e){

            if(e.key === "Enter"){

                searchWeb();

            }

        }
    );

}

});
