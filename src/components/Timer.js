import React, { useState, useEffect } from 'react';

function Timer({ startTime, handleQuizSubmit }) {
  const [elapsedTime, setElapsedTime] = useState(80 * 60 * 1000); // 5 minutes in milliseconds
  const MAX_TIME = 80 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    let interval;
    const endTime = startTime + MAX_TIME;

    if (Date.now() >= endTime) {
      // Timer has reached 0, handle quiz submission
      handleQuizSubmit();
    } else {
      setElapsedTime(endTime - Date.now());

      interval = setInterval(() => {
        const remainingTime = endTime - Date.now();
        setElapsedTime(remainingTime);

        if (remainingTime <= 0) {
          handleQuizSubmit();
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, handleQuizSubmit, MAX_TIME]);

  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // const timerClassName = elapsedTime >= 20 * 60 * 1000 ? 'timer-hurryup' : 'timer';

  return (
    <div>
      <div className='timer'>{formatTime(elapsedTime)}</div>
    </div>
  );
}

export default Timer;

