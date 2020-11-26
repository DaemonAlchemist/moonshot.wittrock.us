import * as React from 'react';

export declare interface IUseTimerOptions {
    interval: number;
    onTick: () => void;
    isRunning: boolean;
}

export const useTimer = (options:IUseTimerOptions):[boolean, () => void, () => void] => {
    const {interval, onTick} = options;
    
    const [isRunning, setIsRunning] = React.useState(options.isRunning);

    const stop = React.useCallback(() => {
        setIsRunning(false);
    }, []);

    const start = React.useCallback(() => {
        setIsRunning(true);
    }, []);

    const tick = React.useCallback(() => {
        if(isRunning) {
            onTick();
        }
    }, [isRunning, onTick]);

    React.useEffect(() => {
        const timer = window.setInterval(tick, interval);
        return () => {
            clearInterval(timer);
        }
    }, [interval, tick]);

    return [isRunning, start, stop];
}
