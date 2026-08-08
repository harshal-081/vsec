const player = document.getElementById("player");
const target = document.getElementById("target");

let x = 100;
let y = 100;

const speed = 20;


function randomPosition() {

    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;

    target.style.left = Math.random() * maxX + "px";
    target.style.top = Math.random() * maxY + "px";
}


randomPosition();


document.addEventListener("keydown", function(event) {

    switch (event.key.toLowerCase()) {

        case "w":
            y -= speed;
            break;

        case "s":
            y += speed;
            break;

        case "a":
            x -= speed;
            break;

        case "d":
            x += speed;
            break;

        default:
            return;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCollision();
});


function checkCollision() {

    const p = player.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    if (
        p.left < t.right &&
        p.right > t.left &&
        p.top < t.bottom &&
        p.bottom > t.top
    ) {

        alert("Target Reached!");

        randomPosition();
    }
}


target.addEventListener("mouseover", function() {

    randomPosition();

});