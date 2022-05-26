import React from "react";
import './Ui.css'

interface Props {
    name:string,
    children: JSX.Element | JSX.Element[]
}


const Ui:React.FC<Props> =({name, children}:Props)=> {
    return (
        <div className={'ui'}>
            {name}
            {children}
        </div>
    )
}
export default  Ui