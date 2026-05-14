function searchWeb(){

function createRain(){

    rainDrops.length = 0;

    for(let i = 0; i < 700; i++){

        rainDrops.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            length: Math.random() * 22,
            speed: Math.random() * 7 + 3,

            opacity: Math.random() * 0.5 + 0.1

        });

    }

}

function createParticles(){

    particles.length = 0;

    for(let i = 0; i < 140; i++){

        particles.push({

            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            radius: Math.random() * 3 + 1,

            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,

            opacity: Math.random() * 0.5 + 0.2

        });

    }

}

createRain();
createParticles();

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(effectMode === "rain"){

        for(let i = 0; i < rainDrops.length; i++){

            const drop = rainDrops[i];

            ctx.beginPath();

            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);

            ctx.strokeStyle =
            `rgba(255,255,255,${drop.opacity})`;

            ctx.stroke();

            drop.y += drop.speed;

            if(drop.y > canvas.height){

                drop.y = -20;
                drop.x = Math.random() * canvas.width;

            }

        }

    }

    requestAnimationFrame(animate);

}

animate();
