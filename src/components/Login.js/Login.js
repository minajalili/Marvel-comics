import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import FormikControl from './Form/FormikControl'
import Authentication from '../Authentication/Authentication'

import './Login.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    state={
        validationSchema :  Yup.object({
            email:Yup.string().email("invalid email format").required("required"),
            password: Yup.string().required("required")
        }),
        initialValues : {
            email:'',
            password : ''
        },
        user:[],
        redirect:false
    }
    redirect(){
        this.setState({
            redirect: true
        })
    }
    onSubmit(value){
        //console.log("data form", value)
        const{email, password} = value
        //console.log(email, password)
        const [user]=Authentication(email, password)
        console.log('resfds', user)
        if(user){
            this.setState({ 
                user:user,
                redirect: true
            })
            this.props.history.replace('/');            
        }
        
        
        
    }

    render() {
        // if (this.state.redirect) {
            
        // }
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
export default withRouter(Login)