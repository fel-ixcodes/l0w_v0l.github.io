/* =========================
   INTRO
========================= */

window.addEventListener("load", () => {

    const intro =
        document.getElementById("intro");

    setTimeout(() => {

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.remove();

        }, 1000);

    }, 2300);

});

/* =========================
   SETTINGS
========================= */

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

settingsButton.onclick = () => {

    settingsPanel.classList.add("active");

};

closeSettings.onclick = () => {

    settingsPanel.classList.remove("active");

};

/* =========================
   SEARCH
========================= */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

function doSearch(){

    const query =
        searchInput.value.trim();

    if(query === "") return;

    window.open(
        `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
        "_blank"
    );

}

searchBtn.onclick = doSearch;

searchInput.addEventListener(
    "keydown",
    (e) => {

        if(e.key === "Enter"){

            doSearch();

        }

    }
);

/* =========================
   TAB CLOAK
========================= */

let favicon =
    document.querySelector("link[rel='icon']");

const cloakPresets =
    document.querySelectorAll(
        ".cloakPreset"
    );

cloakPresets.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const title =
                button.dataset.title;

            const icon =
                button.dataset.icon;

            document.title =
                title;

            favicon.href =
                icon;

            localStorage.setItem(
                "tabTitle",
                title
            );

            localStorage.setItem(
                "tabIcon",
                icon
            );

        }
    );

});

const customTabName =
    document.getElementById(
        "customTabName"
    );

const customFavicon =
    document.getElementById(
        "customFavicon"
    );

const applyCustomCloak =
    document.getElementById(
        "applyCustomCloak"
    );

applyCustomCloak.onclick = () => {

    const title =
        customTabName.value.trim();

    const icon =
        customFavicon.value.trim();

    if(title){

        document.title =
            title;

        localStorage.setItem(
            "tabTitle",
            title
        );

    }

    if(icon){

        favicon.href =
            icon;

        localStorage.setItem(
            "tabIcon",
            icon
        );

    }

};

const savedTitle =
    localStorage.getItem(
        "tabTitle"
    );

const savedIcon =
    localStorage.getItem(
        "tabIcon"
    );

if(savedTitle){

    document.title =
        savedTitle;

}

if(savedIcon){

    favicon.href =
        savedIcon;

}

/* =========================
   BACKGROUND EFFECTS
========================= */

const canvas =
    document.getElementById("bgCanvas");

const ctx =
    canvas.getContext("2d");

let effectMode = "rain";

const effectSelect =
    document.getElementById("effectSelect");

effectSelect.addEventListener(
    "change",
    () => {

        effectMode =
            effectSelect.value;

        localStorage.setItem(
            "bgEffect",
            effectMode
        );

    }
);

const savedEffect =
    localStorage.getItem(
        "bgEffect"
    );

if(savedEffect){

    effectMode =
        savedEffect;

    effectSelect.value =
        savedEffect;

}

/* RESIZE */

function resizeCanvas(){

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* RAIN */

const rainDrops = [];

for(let i = 0; i < 700; i++){

    rainDrops.push({

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

    if(effectMode === "rain"){

        for(let drop of rainDrops){

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
