document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const snakeElement = document.getElementById('snake');
    const foodElement = document.getElementById('food');
    const scoreElement = document.getElementById('score');

    let snake = [{ x: 200, y: 200 }];
    let dx = 0;
    let dy = 0;
    let foodX;
    let foodY;
    let score = 0;

    function initializeGame() {
        snake = [{ x: 200, y: 200 }];
        dx = 0;
        dy = 0;
        score = 0;
        updateScore();
        placeFood();
        drawSnake();
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakeSegment = createSegment(segment.x, segment.y);
            gameContainer.appendChild(snakeSegment);
        });
    }

    function createSegment(x, y) {
        const segment = document.createElement('div');
        segment.style.width = '10px';
        segment.style.height = '10px';
        segment.style.backgroundColor = 'green';
        segment.style.position = 'absolute';
        segment.style.left = x + 'px';
        segment.style.top = y + 'px';
        return segment;
    }

    function clearSnake() {
        const snakeSegments = document.querySelectorAll('.snake-segment');
        snakeSegments.forEach(segment => segment.parentNode.removeChild(segment));
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === foodX && head.y === foodY) {
            score++;
            updateScore();
            placeFood();
        } else {
            snake.pop();
        }
        clearSnake();
        drawSnake();

        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || checkSelfCollision()) {
            gameOver();
        }
    }

    function checkSelfCollision() {
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        return false;
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * 40) * 10;
        foodY = Math.floor(Math.random() * 40) * 10;
        foodElement.style.left = foodX + 'px';
        foodElement.style.top = foodY + 'px';
    }

    function updateScore() {
        scoreElement.textContent = 'Score: ' + score;
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'w':
                if (dy !== 10) {
                    dx = 0;
                    dy = -10;
                }
                break;
            case 's':
                if (dy !== -10) {
                    dx = 0;
                    dy = 10;
                }
                break;
            case 'a':
                if (dx !== 10) {
                    dx = -10;
                    dy = 0;
                }
                break;
            case 'd':
                if (dx !== -10) {
                    dx = 10;
                    dy = 0;
                }
                break;
        }
    }

    function gameOver() {
        alert('Game Over! Your score: ' + score);
        initializeGame();
    }

    initializeGame();
    setInterval(moveSnake, 100);
    document.addEventListener('keydown', changeDirection);
});