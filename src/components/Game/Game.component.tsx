import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Layout } from 'antd';
import * as React from 'react';
import { useTimer } from '../../util/useTimer';
import { Viewport } from '../Viewport';
import { GameProps } from "./Game.d";
import './Game.less';

export const GameComponent = (props:GameProps) => {
    const [t, start] = useTimer(10, 10);
    const [level, setLevel] = React.useState(1);
    const changeLevel = (newLevel:number) => () => {setLevel(newLevel);}

    React.useEffect(() => {
        props.resetLevel(level);
    }, [level]);

    React.useEffect(start, [start]);

    React.useEffect(() => {
        console.log(`Tick: ${t}`);
        props.tick(t);
    }, [t]);

    return <Layout>
        <Layout.Sider>
            <h1>MoonShot</h1>
            <hr />
            <h1>Level</h1>
            <Button.Group>
                <Button disabled={level === 1} onClick={changeLevel(level - 1)}><CaretLeftOutlined /></Button>
                <Button>{level}</Button>
                <Button onClick={changeLevel(level + 1)}><CaretRightOutlined /></Button>
            </Button.Group>
            <hr />
        </Layout.Sider>
        <Layout.Content className="viewports">
            <Viewport className="start-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} />
            <Viewport className="main-viewport" center={{x: 0, y: 0}} zoom={1} />
            <Viewport className="end-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} />
        </Layout.Content>
    </Layout>;
}