import React, {ReactElement} from "react";


let actx = new AudioContext();
let out = actx.destination;

let osc1 = actx.createOscillator()
let gain1 = actx.createGain();
let filter = actx.createBiquadFilter();


// osc1.connect(gain1);
gain1.connect(filter);
filter.connect(out);
osc1.start();

const CTX = React.createContext([{}]);
export {CTX};


interface  State {
    osc1Settings:OscillatorOptions | OscillatorOptions[] |  OscillatorNode | OscillatorNode[];
    filterSettings: OscillatorNode | OscillatorNode[];
}
interface Actions {
    type: string | BiquadFilterType;
    payload: {id:  OscillatorOptions | OscillatorType, value: number | string};

}
export function reducer(state: State, action: Actions) {
    let {id, value}= action.payload || {};
    switch(action.type) {
        case "START_OSC":
            console.log('connect')
            osc1.connect(gain1)

            return{...state};
        case "STOP_OSC":
            // osc1.stop();
            osc1.disconnect()
            return{...state};
        case "CHANGE_OSC1":
            // @ts-ignore
            osc1[id].value = value;
            // @ts-ignore
            return {...state, osc1Settings: {...state.osc1Settings, [id]: value}};
        case "CHANGE_OSC1_TYPE":
            console.log('id',id)
            // @ts-ignore
            osc1.type= id;
            return {...state,osc1Settings: {...state.osc1Settings, type:id}};
        case "CHANGE_FILTER":
            // @ts-ignore
            filter[id].value = value;
            // @ts-ignore
            return {...state,filterSettings: {...state.filterSettings, [id]: value}}
        case "CHANGE_FILTER_TYPE":
            // @ts-ignore
            filter.type = id;
            return {...state,filterSettings: {...state.filterSettings, type: id}}
        default:
            console.log('reducer error. action', action)
            return {...state};
    }
}
interface Props {
    children?: JSX.Element | JSX.Element[] | ReactElement;
}

export default function Store(props:Props) {
    // @ts-ignore
    const stateHook = React.useReducer(reducer , {
        osc1Settings:{
            frequency: osc1.frequency.value,
            detune: osc1.detune.value,
            type : osc1.type
        },
        filterSettings: {
            frequency: filter.frequency.value,
            detune: filter.detune.value,
            Q: filter.Q.value,
            gain: filter.gain.value,
            type : filter.type,
        },
    } );
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}