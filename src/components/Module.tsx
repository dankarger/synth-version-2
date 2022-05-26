import React from "react";

interface Props {
    name: string,
    type: string,
    children:JSX.Element | JSX.Element[]

}

const Module:React.FC<Props>=({name,type,children})=>{
    return(
        <div className={'module'}>
            {name}
            {type}
            {children}
        </div>
    )
}
export default Module;