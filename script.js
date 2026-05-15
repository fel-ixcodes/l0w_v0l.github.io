window.onload = () => {

/* INTRO */

setTimeout(() => {

    const intro =
        document.getElementById("introScreen");

    intro.classList.add("hide");

}, 3200);

/* SEARCH */

function searchWeb(){

    const query =
        document.getElementById("searchInput").value;

    if(!query) return;

    const browser =
        document.getElementById("browserFrame");

    const homepage =
        document.getElementById("homepage");

    const homeBtn =
        document.getElementById("homeBtn");

    homepage.style.display = "none";

    browser.style.display = "block";

    homeBtn.style.display = "block";

    /* INTERNAL TEST PAGE */

    browser.src =
        "data:text/html;charset=utf-8," +
        encodeURIComponent(`
            <html>
            <head>

            <title>${query}</title>

            <style>

            body{

                background:#111;
                color:white;

                font-family:Inter,sans-serif;

                display:flex;

                align-items:center;
                justify-content:center;

                flex-direction:column;

                height:100vh;

                margin:0;
            }

            h1{

                font-size:52px;
            }

            p{

                opacity:0.7;

                font-size:18px;
            }

            </style>

            </head>

            <body>

                <h1>${query}</h1>

                <p>
                    Embedded browser system working.
                </p>

            </body>
            </html>
        `);

}

window.searchWeb = searchWeb;

/* HOME */

function goHome(){

    const browser =
        document.getElementById("browserFrame");

    const homepage =
        document.getElementById("homepage");

    const homeBtn =
        document.getElementById("homeBtn");

    browser.style.display = "none";

    browser.src = "";

    homepage.style.display = "flex";

    homeBtn.style.display = "none";

}

window.goHome = goHome;

/* ENTER KEY */

document
.getElementById("searchInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        searchWeb();

    }

});

/* SETTINGS */

function toggleSettings(){

    const panel =
        document.getElementById("settingsPanel");

    panel.classList.toggle("active");

}

window.toggleSettings = toggleSettings;

/* DROPDOWNS */

function toggleDropdown(id, button){

    const dropdown =
        document.getElementById(id);

    dropdown.classList.toggle("active");

    button.classList.toggle("active");

}

window.toggleDropdown = toggleDropdown;

/* APPLY SETTINGS */

function applySettings(){

    const title =
        document.getElementById("tabTitle").value;

    const icon =
        document.getElementById("tabIcon").value;

    const selectedEffect =
        document.getElementById("effectMode").value;

    effectMode = selectedEffect;

    if(title){

        document.title = title;

    }

    const favicon =
        document.getElementById("favicon");

    if(icon === "classroom"){

        favicon.href =
        "https://ssl.gstatic.com/classroom/favicon.png";

    }

    else if(icon === "google"){

        favicon.href =
        "https://www.google.com/favicon.ico";

    }

    else if(icon === "drive"){

        favicon.href =
        "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

    }

    else if(icon === "docs"){

        favicon.href =
        "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico";

    }

}

window.applySettings = applySettings;

/* CANVAS */

const canvas =
    document.getElementById("rain");

const ctx =
    canvas.getContext("2d");

function resizeCanvas(){

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

/* EFFECTS */

let effectMode = "rain";

const rainDrops = [];
const particles = [];

/* CREATE RAIN */

function createRain(){

    rainDrops.length = 0;

    for(let i = 0; i < 700; i++){

        rainDrops.push({

            x:
                Math.random() * canvas.width,

            y:
                Math.random() * canvas.height,

            length:
                Math.random() * 20 + 5,

            speed:
                Math.random() * 7 + 3,

            opacity:
                Math.random() * 0.5 + 0.1

        });

    }

}

/* CREATE PARTICLES */

function createParticles(){

    particles.length = 0;

    for(let i = 0; i < 140; i++){

        particles.push({

            x:
                Math.random() * canvas.width,

            y:
                Math.random() * canvas.height,

            radius:
                Math.random() * 3 + 1,

            speedX:
                (Math.random() - 0.5) * 0.8,

            speedY:
                (Math.random() - 0.5) * 0.8,

            opacity:
                Math.random() * 0.5 + 0.2

        });

    }

}

/* DELAYED EFFECT START */

setTimeout(() => {

    createRain();

    createParticles();

}, 1800);

/* ANIMATION */

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if(effectMode === "rain"){

        for(let i = 0; i < rainDrops.length; i++){

            const drop = rainDrops[i];

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

            ctx.lineWidth = 1;

            ctx.stroke();

            drop.y += drop.speed;

            if(drop.y > canvas.height){

                drop.y = -20;

                drop.x =
                    Math.random() * canvas.width;

            }

        }

    }

    else if(effectMode === "particles"){

        for(let i = 0; i < particles.length; i++){

            const p = particles[i];

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

            if(p.x < 0){

                p.x = canvas.width;

            }

            if(p.x > canvas.width){

                p.x = 0;

            }

            if(p.y < 0){

                p.y = canvas.height;

            }

            if(p.y > canvas.height){

                p.y = 0;

            }

        }

    }

    requestAnimationFrame(animate);

}

animate();

/* RESIZE */

window.addEventListener("resize", () => {

    resizeCanvas();

    createRain();

    createParticles();

});

};
