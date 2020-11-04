import { LeftCircleTwoTone, PauseCircleTwoTone, PlayCircleTwoTone, RightCircleTwoTone } from "@ant-design/icons";
import { Layout } from 'antd';
import * as React from 'react';
import { useTimer } from '../../util/useTimer';
import { Viewport } from '../Viewport';
import { GameProps } from "./Game.d";
import './Game.less';

export const GameComponent = (props:GameProps) => {
    const {resetLevel, tick} = props;

    const [isRunning, start, stop] = useTimer({
        interval: 10,
        speed: 1,
        onTick: tick,
        isRunning: true,
    });
    const [level, setLevel] = React.useState(1);
    const changeLevel = (newLevel:number) => () => {setLevel(newLevel);}

    React.useEffect(() => {
        resetLevel(level);
    }, [resetLevel, level]);

    React.useEffect(start, [start]);

    return <Layout>
        <Layout.Sider>
            <h1>MoonShot</h1>
            <hr />
            <h1>Level</h1>
            <LeftCircleTwoTone onClick={level > 1 ? changeLevel(level - 1) : undefined} />
            <span className="curLevel">{level}</span>
            <RightCircleTwoTone onClick={changeLevel(level + 1)} />
            <hr />
            <h1>Time</h1>
            <LeftCircleTwoTone onClick={props.reset}/>
            {isRunning && <PauseCircleTwoTone onClick={stop} />}
            {!isRunning && <PlayCircleTwoTone onClick={start} />}
            <hr />
        </Layout.Sider>
        <Layout.Content className="viewports">
            <Viewport className="start-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} />
            <Viewport className="main-viewport" center={{x: 0, y: 0}} zoom={1} />
            <Viewport className="end-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} />
        </Layout.Content>
    </Layout>;
}