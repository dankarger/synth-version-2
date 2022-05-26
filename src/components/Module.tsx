import React from "react";
import './Module.css'

interface Props {
    name: string,
    type: string,
    children:JSX.Element | JSX.Element[]

}

const Module:React.FC<Props>=({name,type,children})=>{
    return(
        <div className={`module ${type}`}>
            {name}
            {type}
            {children}
        </div>
    )
}
export default Module;