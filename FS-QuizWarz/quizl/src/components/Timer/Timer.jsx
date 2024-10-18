import { useEffect, useRef, useState } from 'react';
function Timer({nextQuestion}) {
    const [seconds, setSeconds] = useState(10);
    const timerId = useRef();

    useEffect(() => {
        const startTimer = () => {
            timerId.current = setInterval(() => {
                setSeconds(prevState => {
                    if (prevState === 0) {
                        stopTimer();
                        nextQuestion();
                        return 0;
                    }
                    return prevState - 1
                })
            }, 1000);
        }
        startTimer();
    }, [])




    const stopTimer = () => {
        clearInterval(timerId.current);
        timerId.current = 0;
        setSeconds(10);
    }

    const resetTimer = () => {
        stopTimer();
        if (seconds) {
            setSeconds(10)
        }
    }

    return (
        <>
            <p>Seconds: {seconds}</p>
        </>
    )
}

export default Timer
