import React, { useState, useEffect } from 'react';

function Timer({ startTime, stopTimer }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (!stopTimer) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime, stopTimer]);

  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const timerClassName = elapsedTime >= 20 * 60 * 1000 ? 'timer-hurryup' : 'timer';

  return (
    <div>
      <div className={timerClassName}>{formatTime(elapsedTime)}</div>
    </div>
  );
}

export default Timer;