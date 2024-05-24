document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;

    function control(e) {
        if (e.keyCode === 32) { // Espacio para saltar
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            // Mover hacia arriba
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    // Mover hacia abajo
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20);
            }
            position += 30;
            count++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20);
    }

    function generateObstacles() {
        let randomTime = Math.random() * 4000;
        let obstaclePosition = 600;
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle');
        game.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function () {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId);
                alert('Game Over');
                isGameOver = true;
                while (game.firstChild) {
                    game.removeChild(game.lastChild);
                }
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20);
        if (!isGameOver) setTimeout(generateObstacles, randomTime);
    }

    generateObstacles();
    document.addEventListener('keydown', control);
});
