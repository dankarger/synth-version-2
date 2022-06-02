import React ,{forwardRef} from "react";
//
interface Props {
    label: string,
    ref?: React.RefObject<unknown> ,
    onClick:  React.MouseEventHandler<HTMLButtonElement> | undefined,

}
// const FancyButton = forwardRef((props, ref):Props => (
//     <button ref={ref} className="FancyButton">
//         {props.children}
//     </button>
// ));
//
// // You can now get a ref directly to the DOM button:
// const ref = React.createRef();
// <FancyButton ref={ref}>Click me!</FancyButton>;
const Button =({label, onClick,ref}:Props)=>{
    return(
        <div>
            <button onClick={onClick} >
                {label}
            </button>
        </div>
    )
}
export default Button