import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";
export default function TimeChallenge({ title, targetTime }) {
    let timer = useRef();
    let dialog = useRef();
    const [timeReamaining, setTimeReamaining] = useState(targetTime * 1000);
    const timerIsActive = timeReamaining > 0 && timeReamaining < targetTime * 1000;
    if (timeReamaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }
    function handleReset() {
        setTimeReamaining(targetTime * 1000);
    }

    function hanldeTimer() {

        timer.current = setInterval(() => {
            setTimeReamaining(prevTimeRem => prevTimeRem - 10);
        }, 10)

    }
    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);

    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeReamaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>

                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : hanldeTimer}>
                        {timerIsActive ? 'End' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running' : 'Timer is Inactive'}
                </p>
            </section>

        </>


    );

}