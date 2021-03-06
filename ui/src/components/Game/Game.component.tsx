import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { faBackward, faFastBackward, faForward, faMoon, faPause, faPlay, faRocket, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, InputNumber, Layout, Slider, Table, Modal } from 'antd';
import * as React from 'react';
import { dT, tickInterval, zoomSpeed } from "../../util/constants";
import { IDeltaV } from "../../util/sim";
import { useTimer } from '../../util/useTimer';
import { Viewport } from '../Viewport';
import { GameProps } from "./Game.d";
import './Game.less';

export const GameComponent = (props:GameProps) => {
    const {resetLevel, tick} = props;

    const [isRunning, start, stop] = useTimer({
        interval: tickInterval,
        onTick: tick,
        isRunning: true,
    });
    const [level, setLevel] = React.useState(1);
    const changeLevel = (newLevel:number) => () => {setLevel(newLevel);}

    const [resetTrigger, setResetTrigger] = React.useState(false);
    React.useEffect(() => {
        resetLevel(level);
        setResetTrigger(r => !r);
    }, [resetLevel, level]);
    const reset = () => {resetLevel(level);}

    React.useEffect(start, [start]);

    const deltaVInput = (deltaV:number, record:IDeltaV) => <InputNumber value={deltaV} onChange={props.onChangeDeltaV(record.id, "deltaV")} style={{width: "100%"}} />;
    const timeInput   = (time:number, record:IDeltaV)   => <InputNumber value={time} onChange={props.onChangeDeltaV(record.id, "time")} style={{width: "100%"}} step={dT}/>;
    const angleInput  = (angle:number, record:IDeltaV)  =>
        <Slider value={angle} onChange={props.onChangeDeltaV(record.id, "angle")} min={0} max={2*Math.PI} step={0.01} />;
    const angleDisplay = (angle:number) => <Icon icon={faRocket} style={{transform: `rotate(${angle + Math.PI / 4}rad)`}}/>;
    const actions     = (id:string) => <CloseCircleOutlined title="Remove delta-V" onClick={props.onDeleteDeltaV(id)} />;

    const time = (t:number):string => {
        const s = t % 60; t = Math.floor(t/60);
        const m = t % 60; t = Math.floor(t/60);
        const h = t % 24; t = Math.floor(t/24);
        const d = t % 365; t = Math.floor(t/365);
        const y = t;

        return `${y}:${d}:${h}:${m}:${s}`;
    }

    return <Layout>
        <Layout.Sider width="400px">
            <h1 className="game-title"><Icon icon={faMoon} /> MoonShot <Icon icon={faMoon} /></h1>
            <hr />

            <div id="level-controls">
                <h1>Level</h1>
                <div>
                    <Icon icon={faStepBackward} title="Previous level" onClick={level > 1 ? changeLevel(level - 1) : undefined} />
                    <span className="curLevel">{level}</span>
                    <Icon icon={faStepForward} title="Next level" onClick={changeLevel(level + 1)} />
                </div>
            </div>
            <hr />

            <div id="time-controls">
                <h1 className="time">Time: {time(props.timer.time)}</h1>
                <h1 className="speed">Speedup: {props.timer.steps}</h1>
                <Icon icon={faFastBackward} title="Reset level" onClick={reset}/>
                <Icon icon={faBackward} title="Slower" onClick={props.timer.steps > 1 ? props.updateSpeed(props.timer.steps / 2) : undefined} />
                {isRunning && <Icon icon={faPause} title="Pause" onClick={stop} />}
                {!isRunning && <Icon icon={faPlay} title="Play" onClick={start} />}
                <Icon icon={faForward} title="Faster" onClick={ props.timer.steps < 1024 ? props.updateSpeed(props.timer.steps * 2) : undefined} />
                <Icon icon={faStepForward} title="Step forward" onClick={props.tick} />
            </div>
            <hr />

            <h1>Delta Vs</h1>
            <Table dataSource={props.deltaVs} rowKey="id" pagination={false} size="small" style={{margin: "16px", maxHeight: "256px", overflow: "scroll"}}>
                <Table.Column dataIndex="deltaV" title="Delta-V" render={deltaVInput} width="75px"/>
                <Table.Column dataIndex="time" title="Time" render={timeInput} width="75px" />
                <Table.Column dataIndex="angle" title="Angle" render={angleInput} />
                <Table.Column dataIndex="angle" render={angleDisplay} width="22px"/>
                <Table.Column dataIndex="id" render={actions} width="25px" />
            </Table>
            <Button onClick={props.addDeltaV(props.timer.time)}><PlusOutlined /> Add delta-V</Button>

            <hr/>

            <h1>High Scores for Level {level}</h1>
        </Layout.Sider>
        <Layout.Content className="viewports">
            <Modal visible={props.game.status === "dead"} title="Game Over!" footer={null} onCancel={reset}>
                You crashed into a planet!
            </Modal>
            <Modal visible={props.game.status === "won"} title="You Win!" footer={null} onCancel={reset}>
                You reached the target planet! Congrats.
            </Modal>
            <Viewport
                name="Start"
                className="start-viewport inset-viewport"
                center={{x: 0, y: 0}}
                zoom={Math.pow(zoomSpeed,50)}
                reset={resetTrigger}
                initialSelectedPlanetId={props.game.startId}
            />
            <Viewport name="System overview" className="main-viewport" center={{x: 0, y: 0}} zoom={1} reset={resetTrigger} />
            <Viewport
                name="Target"
                className="end-viewport inset-viewport"
                center={{x: 0, y: 0}}
                zoom={Math.pow(zoomSpeed, 50)}
                reset={resetTrigger}
                initialSelectedPlanetId={props.game.targetId}
            />
        </Layout.Content>
    </Layout>;
}