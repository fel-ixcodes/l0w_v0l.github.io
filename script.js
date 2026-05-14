/* SEARCH */

function searchWeb(){

    const query =
        document.getElementById("searchInput").value;

    if(!query) return;

    const url =
        "https://duckduckgo.com/?q=" +
        encodeURIComponent(query);

    window.open(url, "_blank");

}

/* ENTER KEY */

document
.getElementById("searchInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchWeb();
    }

});

/* SETTINGS PANEL */

function toggleSettings(){

    const panel =
        document.getElementById("settingsPanel");

    panel.classList.toggle("active");

}

/* CANVAS */

const canvas =
    document.getElementById("rain");

const ctx =
    canvas.getContext("2d");

canvas.width =
    window.innerWidth;

canvas.height =
    window.innerHeight;

/* EFFECTS */

let effectMode = "rain";

const rainDrops = [];
const particles = [];

/* CREATE RAIN */

function createRain(){

    rainDrops.length = 0;

    for(let i = 0; i < 700; i++){

        rainDrops.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            length: Math.random() * 22,

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

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

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

createRain();
createParticles();

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

        for(let i = 0; i < rainDrops.length; i++){

            const drop = rainDrops[i];

            ctx.beginPath();

            ctx.moveTo(drop.x, drop.y);

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

    /* PARTICLES */

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

            if(p.x < 0) p.x = canvas.width;
            if(p.x > canvas.width) p.x = 0;

            if(p.y < 0) p.y = canvas.height;
            if(p.y > canvas.height) p.y = 0;

        }

    }

    requestAnimationFrame(animate);

}

animate();

/* APPLY SETTINGS */

function applySettings(){

    const title =
        document.getElementById("tabTitle").value;

    const icon =
        document.getElementById("tabIcon").value;

    const selectedEffect =
        document.getElementById("effectMode").value;

    effectMode = selectedEffect;

    /* TITLE */

    if(title){
        document.title = title;
    }

    /* FAVICON */

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

/* RESIZE */

window.addEventListener("resize", () => {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createRain();
    createParticles();

});
