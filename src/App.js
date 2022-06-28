import {useEffect, useState} from "react";
import Snake from "./Snake/Snake";
import Food from "./Food/Food";

let getRandomCoordinates = () => {
    let [min, max] = [1, 98];
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 5) * 5;
    return [x, y]
}

function App() {
    let [snakeDots, setSnakeDots] = useState([[0, 0], [5, 0]]);
    let [food, setFood] = useState(getRandomCoordinates);
    let [direction, setDirection] = useState('RIGHT');
    let [speed, setSpeed] = useState(150);
    let [menu, setMenu] = useState(false)

    useEffect(() => {
        document.onkeydown = onKeyDown;
        const interval = setInterval(moveSnake, speed);
        return () => clearInterval(interval);
    },)
    useEffect(() => {
        checkIfOutOfBorders()
        checkIfCollapsed()
        checkIfEat()
    }, [snakeDots])

    let onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                setDirection('UP');
                break
            case 40:
                setDirection('DOWN');
                break
            case 37:
                setDirection('LEFT');
                break
            case 39:
                setDirection('RIGHT');
                break
        }
    }
    let moveSnake = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1]

        switch (direction) {
            case 'RIGHT':
                head = [head[0] + 5, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 5, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 5];
                break;
            case 'UP':
                head = [head[0], head[1] - 5];
                break;
        }
        dots.push(head);
        dots.shift();
        setSnakeDots(dots);
    }

    let checkIfCollapsed = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                onGameOver();
            }
        })
    }

    let checkIfEat = () => {
        let head = snakeDots[snakeDots.length - 1];
        let dot = food;

        if (head[0] === dot[0] && head[1] === dot[1]) {
            setFood(getRandomCoordinates)
            enlargeSnake();
            increaseSpeed();
        }
    }

    let enlargeSnake = () => {
        let newSnake = [...snakeDots];
        newSnake.unshift([])
        setSnakeDots(newSnake)
    }

    let increaseSpeed = () => {
        if (speed > 10) {
            setSpeed(speed - 2);
        }
    }

    let checkIfOutOfBorders = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            onGameOver();
        }
    }

    let onGameOver = () => {
        // alert('GAME OVER\nSnake: ' + snakeDots.length);
        setMenu(true)
    }

    let onRestart = () => {
        setMenu(false)
        setSnakeDots([[0, 0], [5, 0]]);
        setFood(getRandomCoordinates);
        setDirection('RIGHT');
        setSpeed(200);
    }

    return (
        <div>
            {menu ? <div style={{marginTop: '53.5px'}}></div> : <div className='score'>Score: {snakeDots.length - 2}</div>}
            <div className='game-area'>
                {menu ?
                    <div className='menu'>
                        <div className='score-menu'>{'Your score: ' + (snakeDots.length - 2)}</div>
                        <button className='restart' onClick={onRestart}>Restart</button>
                    </div>
                    :
                    <>
                        <Snake snakeDots={snakeDots}/>
                        <Food dot={food}/>
                    </>
                }
            </div>
        </div>
    );
}

export default App;
