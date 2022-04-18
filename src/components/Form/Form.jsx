import React from 'react';
import "./Form.css";

const Form = ({placeholder, onChange}) => {
    return (
        <form className="form">
            <input type="text" className="form__input" placeholder={placeholder} onChange={onChange}/>
        </form>
    )
}

export default Form;
