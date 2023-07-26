import { useEffect, useState } from "react";

function CountdownTimer() {


    const [expiryTime, setExpiryTime] = useState("5 feb 2024 15:30:25");
    const [countdownTime, setCountdownTime] = useState(
        {
            countdownDays: '',
            countdownHours: '',
            countdownlMinutes: '',
            countdownSeconds: ''
        }
    );

    const countdownTimer = () => {

        const timeInterval = setInterval(() => {

            const countdownDateTime = new Date(expiryTime).getTime();
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
            const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

            const runningCountdownTime = {
                countdownDays: totalDays,
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds
            }

            setCountdownTime(runningCountdownTime);

            if (remainingDayTime < 0) {
                clearInterval(timeInterval);
                setExpiryTime(false);
            }

        }, 1000);
    }

    useEffect(() => {
        countdownTimer();
    });

    return (
        <div className="row">
            <div className="col-sm-6">
                <h4 className="text-center text-primary">React- Countdown Timer</h4>
                <div className="btn-group my-3">
                    {expiryTime !== false ?
                        <>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownDays} <sub>Days</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownHours} <sub>Hours</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownMinutes} <sub>Minutes</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownSeconds} <sub>Seconds</sub></button>
                        </>
                        : <p>Deal has been Expired</p>}
                </div>
            </div>
        </div>
    )

}
export default CountdownTimer;