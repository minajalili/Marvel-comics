import React, { Component } from 'react'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import FormikControl from './FormikControl'

import './Login.css'

export default class Login extends Component {
    state={
        validationSchema :  Yup.object({
            email:Yup.string().email("invalid email format").required("required"),
            password: Yup.string().required("required")
        }),
        initialValues : {
            email:'',
            password : ''
        }
    }
    onSubmit(value){
        console.log("data form", value)
        const{email, password} = value
        console.log(email, password)
        // if(Authentication(email,password)){
        //     console.log("good")
        //     setAuth(true)
            
        // }else{
        //     console.log("wrong")
        //     setAuth(false)
        // }
         }

    render() {
        return (
            <Formik 
             initialValues= {this.state.initialValues} 
             validationSchema={this.state.validationSchema} 
             onSubmit={this.onSubmit} >
                {
                    formik => {
                        return (
                            <Form className="login__from" >
                                <FormikControl
                                    control ="input"
                                    type="email"
                                    label="Email"
                                    name="email" />
                                <FormikControl
                                    control ="input"
                                    type="password"
                                    label="password"
                                    name="password" />
                                <button 
                                    type="submit" 
                                    disabled={!formik.isValid}
                                    className="login__form--btn" > sumbit </button>
                            </Form>
                        )
                }}
            </Formik>
        )
    }
}
