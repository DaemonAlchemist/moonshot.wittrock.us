import * as React from 'react';

export const useTimer = (interval:number, speed:number):[number, () => void, () => void, () => void] => {
    const [time, setTime] = React.useState(0);
    const [timer, setTimer] = React.useState<number | undefined>();

    const start = () => {
        console.log('Starting timer');
        stop();
        setTimer(window.setInterval(() => {
            setTime(t => t + speed);
        }, interval));
    };

    const stop = () => {
        console.log('Stopping timer');
        clearInterval(timer);
        setTimer(0);
    }

    const reset = () => {
        console.log('Resetting timer');
        stop();
        setTime(0);
    }

    React.useEffect(() => {
        return () => {
            clearInterval(timer);
        }
    }, []);

    return [time, start, stop, reset];
}