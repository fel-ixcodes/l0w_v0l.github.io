window.onload = () => {
    createRain();
    createParticles();

}, 1800);

function applySettings(){

    effectMode =
        document.getElementById("effectMode").value;

}

window.applySettings = applySettings;

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(effectMode === "rain"){

        rainDrops.forEach(drop => {

            ctx.beginPath();

            ctx.moveTo(drop.x, drop.y);

            ctx.lineTo(drop.x, drop.y + drop.length);

            ctx.strokeStyle =
                `rgba(255,255,255,${drop.opacity})`;

            ctx.stroke();

            drop.y += drop.speed;

            if(drop.y > canvas.height){

                drop.y = -20;
                drop.x = Math.random()*canvas.width;
            }
        });
    }

    else if(effectMode === "particles"){

        particles.forEach(p => {

            ctx.beginPath();

            ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);

            ctx.fillStyle =
                `rgba(255,255,255,${p.opacity})`;

            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if(p.x < 0) p.x = canvas.width;
            if(p.x > canvas.width) p.x = 0;
            if(p.y < 0) p.y = canvas.height;
            if(p.y > canvas.height) p.y = 0;

        });
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {

    resizeCanvas();

    createRain();
    createParticles();

});
};
