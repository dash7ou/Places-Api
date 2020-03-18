import React from "react";

import "./Input.css"

const Input = ({ id , label , element, type, placeholder , rows})=>{
    const elementForm = element === "input" ? (
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
        />
        ) : (
            <textarea
                id={id}
                rows = {rows || 3}
            />
        )
    return (
        <div className={`form-control`}>
            <label htmlFor={id}>{ label } </label>
            {elementForm}
        </div>
    );
}

export default Input;