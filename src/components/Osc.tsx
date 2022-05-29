import React, {useContext} from "react";
import './Osc.css'
import {CTX} from "../context/Store"


interface Props {
    name: string,
    typeName: string
}

interface UseContextType {
    appState:string
    useState:
}


const Osc:React.FC<Props> =({name, typeName}:Props)=> {
    const [appState, updateState] = useContext(CTX);
    let {type , frequency, detune}= appState.osc1Settings;


    const change =(e: React.ChangeEvent<HTMLInputElement>)=> {
        let {id, value} = e.target;
        updateState({type: "CHANGE_OSC1", payload: {id, value}})
    }
    const changeType = (e: React.MouseEvent<HTMLButtonElement>)=>{
        let {id} = e.target  as HTMLInputElement;
        updateState({type: "CHANGE_OSC1_TYPE", payload: {id}})
    }


    return (
        <div className={'osc-div'}>
            <h2>Osc- {name}</h2>
            <h3>Type: {type}</h3>
            <div >
                <button onClick={()=>updateState({type:"START_OSC"})}>Start</button>
                <button onClick={()=>updateState({type:"STOP_OSC"})}>Stop</button>
            </div>
            <div className="control">
                <h2>OSC1</h2>
                <div >
                    <button onClick={()=>updateState({type:"START_OSC"})}>Start</button>
                    <button onClick={()=>updateState({type:"STOP_OSC"})}>Stop</button>
                </div>
                <div className="params">

                    <h3>frequency</h3>
                    <input
                        max="5000"
                        value={frequency}
                        onChange={change} type="range" id="frequency"/>
                </div>

                <div className="params">

                    <h3>detune</h3>
                    <input
                        // max="5000"
                        value={detune}
                        onChange={change} type="range" id="detune"/>
                </div>
                <div className="params">

                    <h3>wave</h3>
                    <button onClick={changeType}  id="sine" className={`${type ==='sine' && 'active'}`}>sine</button>
                    <button onClick={changeType}  id="triangle" className={`${type ==='triangle' && 'active'}`}>triangle</button>
                    <button onClick={changeType}  id="square" className={`${type ==='square' && 'active'}`}>square</button>
                    <button onClick={changeType}  id="sawtooth" className={`${type ==='sawtooth' && 'active'}`}>sawtooth</button>

                </div>
            </div>
        </div>
    )
}

export default Osc