import React from "react";
import "./Input.css";

function Input({label,...props}){
    return (
        <div className="containe">
            {label && <label>{label}</label>}
            <input type="text" {...props}/>
        </div>
    );
}
export default Input;