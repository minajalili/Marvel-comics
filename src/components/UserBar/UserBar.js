import React from 'react'
import { InputGroup, Form, Accordion, Card, Modal, Button } from 'react-bootstrap';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer, MDBIcon } from 'mdbreact';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default function UserBar() {
    return (
        <div  >
            <MDBContainer style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}} >
                <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
                    <MDBCardTitle>
                        welcom!
                    </MDBCardTitle>
                    <MDBCardText>
                        this is your pannel
                    </MDBCardText>
                    <div className="flex-row">
                    <a href="#!">
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
