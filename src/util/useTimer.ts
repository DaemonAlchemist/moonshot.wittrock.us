import * as React from 'react';

export declare interface IUseTimerOptions {
    interval: number;
    speed: number;
    onTick: (dt:number) => void;
    isRunning: boolean;
}

export const useTimer = (options:IUseTimerOptions):[boolean, () => void, () => void] => {
    const {interval, speed, onTick} = options;
    
    const [isRunning, setIsRunning] = React.useState(options.isRunning);

    const stop = React.useCallback(() => {
        setIsRunning(false);
    }, []);

    const start = React.useCallback(() => {
        setIsRunning(true);
    }, []);

    const tick = React.useCallback(() => {
        if(isRunning) {
            onTick(speed);
        }
    }, [isRunning, onTick, speed]);

    React.useEffect(() => {
        const timer = window.setInterval(tick, interval);
        return () => {
            clearInterval(timer);
        }
    }, [interval, tick]);

    return [isRunning, start, stop];
}
