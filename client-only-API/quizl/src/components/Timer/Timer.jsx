import { useRef, useState } from 'react';
function Timer() {
    const [input, setInput] = useState('');
    const [seconds, setSeconds] = useState(30);
    const renders = useRef(0);
    const timerId = useRef();

    const handleChange = (e) => {
        setInput(e.target.value);
        renders.current++;
    }


    const startTimer = () => {
        timerId.current = setInterval(() => {
            renders.current++
            setSeconds(prevState => {
                if (prevState === 0) {
                    stopTimer();
                    return 30;
                }
                return prevState - 1
            })
        }, 1000);
    }


    const stopTimer = () => {
        clearInterval(timerId.current);
        timerId.current = 0;
        setSeconds(30);
        alert("You're all outta time!")
    }

    const resetTimer = () => {
        stopTimer();
        if (seconds) {
            renders.current++;
            setSeconds(30)
        }
    }

    return (
        <>
            <input
                type="text"
                value={input}
                onChange={handleChange}
            />
            <p>Renders: {renders.current}</p>
            <p>Seconds: {seconds}</p>
            <button onClick={startTimer}>Start timer</button>
            <button onClick={stopTimer}>Stop timer</button>
            <button onClick={resetTimer}>Reset timer</button>

        </>
    )
}

export default Timer
