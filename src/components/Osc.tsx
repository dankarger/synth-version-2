import React, {useContext, useState, useRef} from "react";
import './Osc.css'
import {notes} from "./notes";
// import {CTX} from "../context/Store"


interface Props {
    name: string,
    typeName: string
}
//
// // interface UseContextType {
// //     appState:string
// //     useState:
// // }
//
//
// let actx = new AudioContext();
// let out = actx.destination;
//
// let osc1 = actx.createOscillator()
// let gain1 = actx.createGain();
// let filter = actx.createBiquadFilter();
//
//
// // osc1.connect(gain1);
// gain1.connect(filter);
// filter.connect(out);
// osc1.start();

const audioContext = new AudioContext();


const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate)

const channelData = buffer.getChannelData(0);
console.log(channelData.length)

for (let i=0; i< buffer.length; i++) {
    channelData[i] = Math.random() * 2 -1;
}


const primaryGainControl = audioContext.createGain()
primaryGainControl.gain.setValueAtTime(0.05,0)

primaryGainControl.connect(audioContext.destination)


const Osc:React.FC<Props> =({name, typeName}:Props)=> {
    // const [appState, updateState] = useContext(CTX);
    // let {type , frequency, detune}= appState.osc1Settings;
    const [frequency, setFrequency] = useState(200);
    const [detune, setDetune] = useState(0);

    const [ type, changeTypeState] = useState('sine')
    const buttonRef = useRef(null)

    const setupOsc =()=>{

       return notes.map(({name, frequency})=> {
            // const noteButton = document.createElement('button')
            // noteButton.innerText = name;
            // noteButton.addEventListener('click', ()=> {

                const handleClick =()=>{
                const noteOscillator = audioContext.createOscillator();
                noteOscillator.type = 'square';
                noteOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

                const vibrato = audioContext.createOscillator();
                vibrato.frequency.setValueAtTime(20, 0);
                const vibratoGain = audioContext.createGain();
                vibratoGain.gain.setValueAtTime(10,0);
                vibrato.connect(vibratoGain);
                vibratoGain.connect(noteOscillator.frequency);
                vibrato.start();

                const attackTime = 0.2;
                const decayTime = 0.3;
                const sustainLevel = 0.7;
                const releaseTime = 0.2;

                const now = audioContext.currentTime
                const noteGain = audioContext.createGain();
                noteGain.gain.setValueAtTime(0,0);
                noteGain.gain.linearRampToValueAtTime(1, now + attackTime);
                noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime +decayTime)
                noteGain.gain.setValueAtTime(sustainLevel, now + 1 - releaseTime )
                noteGain.gain.linearRampToValueAtTime(0, now+1)


                noteOscillator.connect(noteGain)
                noteGain.connect(primaryGainControl)
                noteOscillator.start();
                noteOscillator.stop(audioContext.currentTime +1)
            }
            // )
            // document.body.appendChild(noteButton)
            return (
                <button
                onClick={handleClick}
                key={name}
                >{name} </button>
            )
        })


    }

    // const change =(e: React.ChangeEvent<HTMLInputElement>)=> {
    //     let {id, value} = e.target as any;
    //     osc1.frequency.value = value
    //    setFrequency(value)
    //
    //     // updateState({type: "CHANGE_OSC1", payload: {id, value}})
    // }
    // const changeType = (e: React.MouseEvent<HTMLButtonElement>)=>{
    //     let {id} = e.target  as HTMLInputElement;
    //     // updateState({type: "CHANGE_OSC1_TYPE", payload: {id}})
    // }


    return (
        <div className={'osc-div'}>
            <h2>Osc- {name}</h2>
            <h3>Type: {typeName}</h3>
            <div >
                {/*<button onClick={*/}
                {/*    ()=>updateState({type:"START_OSC"})*/}
                {/*    ()=>{osc1.connect(gain1)*/}
                {/*        osc1.start();}*/}
                {/*}>Start</button>*/}
                {/*<button onClick={*/}
                {/*    // ()=>updateState({type:"STOP_OSC"})*/}
                {/*    // ()=>{osc1.disconnect(gain1)}*/}
                {/*}>Stop</button>*/}
            </div>
            <div className="control">
                <h2>OSC1</h2>
                <div >
                    {/*<button onClick={*/}
                    {/*    ()=>{osc1.start()}*/}
                    {/*    // ()=>updateState({type:"START_OSC"})*/}
                    {/*}>Start</button>*/}
                    {/*<button onClick={*/}
                    {/*    // ()=>updateState({type:"STOP_OSC"})*/}
                    {/*    ()=>{osc1.stop()}*/}
                    {/*}>Stop</button>*/}
                    {setupOsc()}
                </div>
                <div className="params">

                    <h3>frequency</h3>
                    {/*<input*/}
                    {/*    max="5000"*/}
                    {/*    value={frequency}*/}
                    {/*    onChange={change} type="range" id="frequency"/>*/}
                </div>

                <div className="params">

                    <h3>detune</h3>
                    <input
                        // max="5000"
                        value={detune}
                        // onChange={change}
                        type="range" id="detune"/>
                </div>
                <div className="params">

                    <h3>wave</h3>
                    {/*<button */}
                    {/*    // onClick={changeType}*/}
                    {/*        id="sine" className={`${type ==='sine' && 'active'}`}>sine</button>*/}
                    {/*<button */}
                    {/*    // onClick={changeType}*/}
                    {/*        id="triangle" className={`${type ==='triangle' && 'active'}`}>triangle</button>*/}
                    {/*<button */}
                    {/*    // onClick={changeType}*/}
                    {/*        id="square" className={`${type ==='square' && 'active'}`}>square</button>*/}
                    {/*<button */}
                    {/*    // onClick={changeType}*/}
                    {/*        id="sawtooth" className={`${type ==='sawtooth' && 'active'}`}>sawtooth</button>*/}

                </div>
            </div>
        </div>
    )
}

export default Osc