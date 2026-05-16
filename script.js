/* =========================
   STARTUP
========================= */

window.onload = function(){

    initIntro();

    initEffects();

    initSearch();

};

/* =========================
   INTRO
========================= */

function initIntro(){

    const intro =
        document.getElementById("introScreen");

    if(!intro) return;

    setTimeout(() => {

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.remove();

        }, 1200);

    }, 2400);

}

/* =========================
   SEARCH SYSTEM
========================= */

function initSearch(){

    const input =
        document.getElementById("searchInput");

    if(!input) return;

    input.addEventListener(
        "keydown",
        function(e){

            if(e.key === "Enter"){

                searchWeb();

            }

        }
    );

}

function searchWeb(){

    const input =
        document.getElementById("searchInput");

    if(!input) return;

    const query =
        input.value.trim();

    if(query === "") return;

    openBrowserApp();

    loadInternalPage(query);

}

window.searchWeb = searchWeb;

/* =========================
   BROWSER APP
========================= */

function openBrowserApp(){

    const browser =
        document.getElementById("browserWindow");

    if(browser){

        browser.style.display = "flex";

    }

}

window.openBrowserApp = openBrowserApp;

function closeBrowser(){

    const browser =
        document.getElementById("browserWindow");

    if(browser){

        browser.style.display = "none";

    }

}

window.closeBrowser = closeBrowser;

function minimizeBrowser(){

    closeBrowser();

}

window.minimizeBrowser = minimizeBrowser;

function goHome(){

    closeBrowser();

}

window.goHome = goHome;

/* =========================
   INTERNAL PAGES
========================= */

function loadInternalPage(query){

    const frame =
        document.getElementById("browserFrame");

    if(!frame) return;

    const html = `

    <html>

    <head>

    <style>

    body{

        margin:0;

        background:#111;

        color:white;

        font-family:Arial,sans-serif;

        padding:50px;
    }

    h1{

        font-size:54px;
    }

    .card{

        margin-top:20px;

        padding:24px;

        background:#1b1b1b;

        border:1px solid #2d2d2d;

        border-radius:20px;
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

            <h2>Browser App Online</h2>

            <p>
                Internal browser system is functioning.
            </p>

        </div>

        <div class="card">

            <h2>Future Features</h2>

            <p>
                Tabs, bookmarks, widgets,
                games, apps, and custom pages.
            </p>

        </div>

    </body>

    </html>

    `;

    frame.src =
        "data:text/html;charset=utf-8," +
        encodeURIComponent(html);

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

    if(query === "") return;

    loadInternalPage(query);

}

window.browserNavigate = browserNavigate;

function browserRefresh(){

    const frame =
        document.getElementById("browserFrame");

    try{

        frame.contentWindow.location.reload();

    }catch(e){}

}

window.browserRefresh = browserRefresh;

function browserBack(){

    const frame =
        document.getElementById("browserFrame");

    try{

        frame.contentWindow.history.back();

    }catch(e){}

}

window.browserBack = browserBack;

function browserForward(){

    const frame =
        document.getElementById("browserFrame");

    try{

        frame.contentWindow.history.forward();

    }catch(e){}

}

window.browserForward = browserForward;

/* =========================
   SETTINGS
========================= */

function toggleSettings(){

    const panel =
        document.getElementById("settingsPanel");

    if(!panel) return;

    panel.classList.toggle("active");

}

window.toggleSettings = toggleSettings;

function toggleDropdown(id){

    const dropdown =
        document.getElementById(id);

    if(!dropdown) return;

    dropdown.classList.toggle("active");

}

window.toggleDropdown = toggleDropdown;

/* =========================
   EFFECTS
========================= */

let effectMode = "rain";

function applySettings(){

    const mode =
        document.getElementById("effectMode");

    if(mode){

        effectMode = mode.value;

    }

}

window.applySettings = applySettings;

function initEffects(){

    const canvas =
        document.getElementById("rain");

    if(!canvas) return;

    const ctx =
        canvas.getContext("2d");

    if(!ctx) return;

    function resize(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );

    /* RAIN */

    const rain = [];

    for(let i = 0; i < 700; i++){

        rain.push({

            x:
                Math.random() * canvas.width,

            y:
                Math.random() * canvas.height,

            len:
                Math.random() * 20 + 5,

            speed:
                Math.random() * 7 + 3,

            opacity:
                Math.random() * 0.5 + 0.1

        });

    }

    /* PARTICLES */

    const particles = [];

    for(let i = 0; i < 140; i++){

        particles.push({

            x:
                Math.random() * canvas.width,

            y:
                Math.random() * canvas.height,

            radius:
                Math.random() * 3 + 1,

            vx:
                (Math.random()-0.5)*0.8,

            vy:
                (Math.random()-0.5)*0.8,

            opacity:
                Math.random() * 0.5 + 0.2

        });

    }

    /* ANIMATE */

    function animate(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        /* RAIN */

        if(effectMode === "rain"){

            for(let drop of rain){

                ctx.beginPath();

                ctx.moveTo(
                    drop.x,
                    drop.y
                );

                ctx.lineTo(
                    drop.x,
                    drop.y + drop.len
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

            }

        }

        /* PARTICLES */

        else if(effectMode === "particles"){

            for(let p of particles){

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

                p.x += p.vx;
                p.y += p.vy;

                if(p.x < 0)
                    p.x = canvas.width;

                if(p.x > canvas.width)
                    p.x = 0;

                if(p.y < 0)
                    p.y = canvas.height;

                if(p.y > canvas.height)
                    p.y = 0;

            }

        }

        requestAnimationFrame(
            animate
        );

    }

    animate();

}
