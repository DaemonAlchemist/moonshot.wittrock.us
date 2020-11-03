import * as React from 'react';

export const useTimer = (interval:number, speed:number):[number, () => void, () => void, () => void] => {
    const [time, setTime] = React.useState(0);
    const [timer, setTimer] = React.useState<number | undefined>();

    const stop = React.useCallback(() => {
        console.log('Stopping timer');
        clearInterval(timer);
    }, [timer]);

    const start = React.useCallback(() => {
        console.log('Starting timer');
        setTimer(window.setInterval(() => {
            setTime(t => t + speed);
        }, interval));
    }, [interval, speed]);

    const reset = React.useCallback(() => {
        console.log('Resetting timer');
        clearInterval(timer);
        setTime(0);
    }, [timer]);

    React.useEffect(() => {
        return () => {
            clearInterval(timer);
        }
    }, [timer]);

    return [time, start, stop, reset];
}