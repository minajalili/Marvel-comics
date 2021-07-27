import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class logout extends Component {
    state = { 
        redirect: false
    }
    componentDidMount() {
        localStorage.removeItem('user');
        //this.props.logout();
        this.setState({ redirect: true });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <div>

            </div>
        )
    }
}

