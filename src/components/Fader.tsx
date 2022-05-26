import React, {SyntheticEvent, useState} from "react";
import './Fader.css'


interface Props {
    name: string,
    type: string

}
const Fader:React.FC<Props> =({name, type}:Props)=> {

    const [frequency, setFrequency] = useState<number>(200)
    const handleChange=(e:  React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value)
    }

    return (
        <div className={'fader-div'}>
            <h2>{name}</h2>

            <input type="range"
                    value={frequency}
                   onChange={handleChange}
                   className="fader"
                   max="10000"
            />
        </div>
    )
}

export default Fader