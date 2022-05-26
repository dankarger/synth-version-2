import React from "react";
import './Osc.css'


interface Props {
    name: string,
    type: string

}
const Osc:React.FC<Props> =({name, type}:Props)=> {
    return (
        <div className={'osc'}>
            <h2>Osc- {name}</h2>
            <h3>Type: {type}</h3>
        </div>
    )
}

export default Osc