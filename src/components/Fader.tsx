import React,{useState} from "react";
import './Fader.scss'


interface Props {
    name: string,
    type: string

}
const Fader:React.FC<Props> =({name, type}:Props)=> {

    const [faderValue, setFaderValue] = useState<number>(200)
    const handleChange=(e:  React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value);
        setFaderValue(parseInt(e.target.value));
    }


    return (
        <div className={'fader-div'}>
            <h2>{name}</h2>
            <input type="range"
                    value={faderValue}
                   onChange={handleChange}
                   className="fader"
                   max="10000"
            />
            <div className={'fader-value'}>
                {faderValue}
            </div>
        </div>
    )
}

export default Fader