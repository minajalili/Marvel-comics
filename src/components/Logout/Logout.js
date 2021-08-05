import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionsCreators from '../../store/Actions/index'

class Logout extends Component {
    state = { 
        redirect: false
    }
    componentDidMount() {
        localStorage.removeItem('user');
        this.props.logout();
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

const mapDispatchToProps = dispatch => {

    return {

        logout: () => dispatch(
            actionsCreators.logout()
        ),

    };
}

export default connect(null, mapDispatchToProps)(Logout);