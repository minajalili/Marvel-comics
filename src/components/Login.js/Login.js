import React, { Component, Fragment } from 'react'
import { Redirect} from 'react-router-dom'
import axios from '../../API/AxiosLogin'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { connect } from 'react-redux'
import * as actionsCreators from '../store/Actions/index'
import FormikControl from './Form/FormikControl'
import { Modal, Button } from 'react-bootstrap'


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
        redirect:false,
        showerrorText: false,
        errorText: '',
    }
    componentDidMount() {
        const userRes = JSON.parse( localStorage.getItem('user'))
        if(userRes !== '' && userRes !== null){
            this.props.history.replace('/');
            this.setState({ redirect: true })
        }
        
    }
    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    redirect(){
        this.setState({
            redirect: true
        })
        this.props.history.replace('/');
    }
    fetch(email, password){
        axios.get()
        .then(response => {
            if (response.data) {
                 response.data.map(item=>{
                    if(item.email===email && item.password==password){
                        localStorage.setItem('user', JSON.stringify(item.heroId))
                        return this.props.login(item).then(this.redirect())                        
                    }
                })
                
            }
            
        })
        .catch(error => {
            console.log(error);
            this.setState({ showerrorText: true, errorText: error.message })
            
        });
    }
    onSubmit(value){
        const{email, password} = value
        this.fetch(email, password) 
        if(!this.state.redirect){
            setTimeout(
                ()=>this.setState({ 
                    showerrorText: true, 
                    errorText: "Could not authenticate you! try again" 
                }),5000)
            
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
            <Fragment>
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
                <Modal show={this.state.showerrorText} onHide={() => this.setState({ showerrorText: false })}>
                <Modal.Header closeButton className="modalheader">
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbody"> {this.state.errorText}</Modal.Body>
                <Modal.Footer>
                    <Button  className="btnM" onClick={() => this.setState({ showerrorText: false })}>
                        close
                    </Button>
                </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        userData:state.auth.user
    }
}
const mapDispatchToProps = dispatch => {

    return {

        login: (user) => dispatch(
            actionsCreators.login(user)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);