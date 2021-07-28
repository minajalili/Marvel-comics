import React from 'react'
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux'
import './UserBar.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function UserBar(props) {
    return (
        <div  >
            <MDBContainer className="userbar__container">
                <MDBCard className="card-body userbar__container__body">
                    <MDBCardTitle>
                        welcom   
                        <span className="userbar__container--span">{ props.userData.user }</span> !
                    </MDBCardTitle>
                    <MDBCardText>
                        this is your pannel
                    </MDBCardText>
                    <div className="flex-row">
                    <a href="/logout">
                        <MDBIcon icon="sign-out-alt" />
                        logout
                    </a>
                    <a 
                      href="https://www.marvel.com/" 
                      style={{ marginLeft: "1.25rem" }}
                      target="_blank"
                      rel="noreferrer"
                      >Marvel site</a>
                    </div>
                </MDBCard>
            </MDBContainer>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        userData: state.auth.user
    };
}

export default connect(mapStateToProps)(UserBar)