import React from "react";
import './Module.scss'

interface Props {
    name: string,
    type: string,
    children:JSX.Element | JSX.Element[]

}

const Module:React.FC<Props>=({name,type,children})=>{
    return(
        <div className={`module-div ${type}`}>

            <h3>{name}</h3>
            <div className={`module`}>

                {type}
                {children}
            </div>
        </div>
    )
}
export default Module;