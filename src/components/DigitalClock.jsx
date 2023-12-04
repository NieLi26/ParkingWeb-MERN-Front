import { useEffect, useState } from 'react';
import '../styles/DigitalClock.css'

const DigitalClock = ({ className }) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="clock">
            <div className={`timer ${className}`}>{date.toLocaleTimeString()}</div>
        </div>
    );
}

export default DigitalClock

