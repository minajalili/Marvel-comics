import React, {Fragment} from 'react';
import { Field , ErrorMessage} from 'formik'
import TextError from '../TextError/TextError';
import './Input.css'

function Input(props) {
    const { label, name, ...rest} = props
    return (
        <Fragment>
        <div className="inputContainer">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} placeholder={label} {...rest} />
        </div>
        <ErrorMessage name={name} component={TextError} />
        </Fragment>
    );
}

export default Input;