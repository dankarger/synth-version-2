import React, {useContext, useState, useRef, useEffect, createRef} from "react";
import './Osc.css'
import {notes} from "./notes";

// import {CTX} from "../context/Store"


interface Props {
    oscName: string,
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

const Osc:React.FC<Props> =({oscName, typeName}:Props)=> {
    // const [appState, updateState] = useContext(CTX);
    // let {type , frequency, detune}= appState.osc1Settings;
    const [frequency, setFrequency] = useState(200);
    const [vibratoLevel, setVibratoLevel] = useState(0);

    const [detune, setDetune] = useState(50);

    const [ oscType, setOscType] = useState<string | OscillatorType>('sine')
    const buttonRef = useRef(null)
    const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
    const tryRef = createRef()

    const arrLength = notes.length;
    const [elRefs, setElRefs] = React.useState([]);

    // React.useEffect(() => {
    //     // add or remove refs
    //     setElRefs((elRefs) =>
    //         Array(arrLength)
    //             .fill()
    //             .map((_, i) => elRefs[i] || createRef()),
    //     );
    // }, [arrLength]);



    const setupOsc =()=>{
       return notes.map(({name, frequency, key},i)=> {
                const handleClick =()=>{
                const noteOscillator = audioContext.createOscillator();
                // noteOscillator.type = oscType=== 'sine'? 'sine' :'square';
                    // @ts-ignore
                    noteOscillator.type = oscType;
                noteOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                const vibrato = audioContext.createOscillator();
                vibrato.frequency.setValueAtTime(vibratoLevel, 0);
                const vibratoGain = audioContext.createGain();
                vibratoGain.gain.setValueAtTime(20,0);
                vibrato.connect(vibratoGain);
                vibratoGain.connect(noteOscillator.frequency);
                vibrato.start();
                const attackTime = 0.2;
                const decayTime = 0.3;
                const sustainLevel = 0.7;
                const releaseTime = 0.2;
                const now = audioContext.currentTime
                const noteGain = audioContext.createGain();
                noteOscillator.frequency.setValueAtTime(frequency+detune,audioContext.currentTime)
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
           // itemsRef.current = itemsRef.current.slice(0, notes.length);

              // const newItemRef = createRef()
                // itemsRef.current.current.push()
            document.addEventListener('keypress',(e)=>{
                console.log('key',buttonRef)
                if(e.key === key) {
                    console.log(itemsRef)
                    handleClick()
                }
            })
           // @ts-ignore
           return (
                <button
                onClick={handleClick}
                // ref={el => itemsRef.current[i] = el}
                key={name + oscName}
                // ref={el => itemsRef.current[i]  = el }
                >{name} </button>
            )
        })


    }

    const change =(e: React.ChangeEvent<HTMLInputElement>)=> {
        let {id, value} = e.target as any;
        // osc1.frequency.value = value
       setFrequency(value)

        // updateState({type: "CHANGE_OSC1", payload: {id, value}})
    }
    // const changeType = (e: React.MouseEvent<HTMLButtonElement>)=>{
    //     let {id} = e.target  as HTMLInputElement;
    //     // updateState({type: "CHANGE_OSC1_TYPE", payload: {id}})
    // }

    const handleVibratoChange = (e:React.FormEvent<HTMLInputElement>)=>{
        setVibratoLevel(Number(e.currentTarget.value));
    }

    const handleDetuneChange =(e:React.FormEvent<HTMLInputElement>) => {
        setDetune(Number(e.currentTarget.value))
    }
    const handleChangeOscType  =(e:React.FormEvent<HTMLSelectElement>) => {
        setOscType(e.currentTarget.selectedOptions[0].value)
        console.log('gg',e.currentTarget.selectedOptions[0].value)
    }
    return (
        <div className={'osc-div'}>
            <h2>{oscName}</h2>
            {/*<h3>Type: {typeName}</h3>*/}
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

                <div >
                    {/*<button onClick={*/}
                    {/*    ()=>{osc1.start()}*/}
                    {/*    // ()=>updateState({type:"START_OSC"})*/}
                    {/*}>Start</button>*/}
                    {/*<button onClick={*/}
                    {/*    // ()=>updateState({type:"STOP_OSC"})*/}
                    {/*    ()=>{osc1.stop()}*/}
                    {/*}>Stop</button>*/}

                </div>
                <div className="params">

                    <h3>Vibrato</h3>
                    {/*<input*/}
                    {/*    max="5000"*/}
                    {/*    value={frequency}*/}
                    {/*    onChange={change} type="range" id="frequency"/>*/}
                    <input type="range"
                           max={100}
                           value={vibratoLevel}
                           onChange={handleVibratoChange}
                    />
                </div>
                <div className="params">

                    <h3>detune</h3>
                    <input
                        max="100"
                        value={detune}
                        onChange={handleDetuneChange}
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
                    <label htmlFor="oscTypes">Type</label>
                    <select name="oscTypes" id="oscTypes" defaultValue={oscType} onChange={handleChangeOscType} >
                        <option value="sine">Sine</option>
                        <option value="triangle">triangle</option>
                        <option value="square">square</option>
                        <option value="sawtooth">sawtooth</option>

                    </select>
                </div>
                {setupOsc()}
            </div>
        </div>
    )
}

export default Osc