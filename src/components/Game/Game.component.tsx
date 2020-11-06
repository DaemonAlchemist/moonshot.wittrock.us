import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { faBackward, faFastBackward, faForward, faMoon, faPause, faPlay, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, InputNumber, Layout, Slider, Table } from 'antd';
import * as React from 'react';
import { IDeltaV } from "../../util/sim";
import { useTimer } from '../../util/useTimer';
import { Viewport } from '../Viewport';
import { GameProps } from "./Game.d";
import './Game.less';

export const GameComponent = (props:GameProps) => {
    const {resetLevel, tick} = props;

    const [isRunning, start, stop] = useTimer({
        interval: 5,
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

    const deltaVInput = (deltaV:number, record:IDeltaV) => <Slider value={deltaV} onChange={props.onChangeDeltaV(record.id, "deltaV")} min={0} max={10} step={0.01} />;
    const timeInput   = (time:number, record:IDeltaV)   => <InputNumber value={time} onChange={props.onChangeDeltaV(record.id, "time")}   />;
    const angleInput  = (angle:number, record:IDeltaV)  => <Slider value={angle} onChange={props.onChangeDeltaV(record.id, "angle")} min={0} max={2*Math.PI} step={0.01} />;
    const actions     = (id:string) => <CloseCircleOutlined title="Remove delta-V" onClick={props.onDeleteDeltaV(id)} />;

    return <Layout>
        <Layout.Sider width="300px">
            <h1><Icon icon={faMoon} /> MoonShot <Icon icon={faMoon} /></h1>
            <hr />

            <div id="level-controls">
                <h1>Level</h1>
                <Icon icon={faStepBackward} title="Previous level" onClick={level > 1 ? changeLevel(level - 1) : undefined} />
                <span className="curLevel">{level}</span>
                <Icon icon={faStepForward} title="Next level" onClick={changeLevel(level + 1)} />
            </div>
            <hr />

            <div id="time-controls">
                <h1 className="time">Time: {props.timer.time}</h1>
                <h1 className="speed">Speed: {props.timer.speed}</h1>
                <Icon icon={faFastBackward} title="Reset level" onClick={reset}/>
                <Icon icon={faBackward} onClick={props.timer.speed > 1 ? props.updateSpeed(props.timer.speed / 2) : undefined} />
                {isRunning && <Icon icon={faPause} title="Pause" onClick={stop} />}
                {!isRunning && <Icon icon={faPlay} title="Play" onClick={start} />}
                <Icon icon={faForward} onClick={props.updateSpeed(props.timer.speed * 2)} />
            </div>
            <hr />

            <h1>Delta Vs</h1>
            <Table dataSource={props.deltaVs} pagination={false} size="small" style={{margin: "16px"}}>
                <Table.Column width={75} dataIndex="deltaV" title="Delta-V" render={deltaVInput}/>
                <Table.Column width={75} dataIndex="time" title="Time" render={timeInput}/>
                <Table.Column dataIndex="angle" title="Angle" render={angleInput} />
                <Table.Column dataIndex="id" render={actions} />
            </Table>
            <Button onClick={props.addDeltaV(props.timer.time)}><PlusOutlined /> Add delta-V</Button>
        </Layout.Sider>
        <Layout.Content className="viewports">
            <Viewport name="Start" className="start-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} reset={resetTrigger} />
            <Viewport name="System overview" className="main-viewport" center={{x: 0, y: 0}} zoom={1} reset={resetTrigger} />
            <Viewport name="Target" className="end-viewport inset-viewport" center={{x: 0, y: 0}} zoom={1} reset={resetTrigger} />
        </Layout.Content>
    </Layout>;
}