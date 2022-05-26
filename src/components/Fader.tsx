import React from "react";
import './Fader.css'


interface Props {
    name: string,
    type: string

}
const Fader:React.FC<Props> =({name, type}:Props)=> {
    return (
        <div className={'fader'}>
            <h2>Fader- {name}</h2>
            <h3>Type: {type}</h3>
        </div>
    )
}

export default Fader