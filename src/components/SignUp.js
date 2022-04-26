import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Form, Col, FormGroup, Row, Label, Text} from 'reactstrap';
const SignUp = () => {
    return (
        <>
            <div className="app">
                <div className="login-form">
                    <div className="title">Sign Up</div>
                    <div className="form">
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="input-field">
                                        <Label for="firstname">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstname"
                                            name="fname"
                                            placeholder="First Name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="input-field">
                                        <Label for="lastname">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastname"
                                            name="lname"
                                            placeholder="Last Name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="input-field">
                                        <Label for="exampleEmail">
                                            Email
                                        </Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="with a placeholder"
                                            type="email"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="input-field">
                                        <Label for="examplePassword">
                                            Password
                                        </Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            placeholder="password placeholder"
                                            type="password"
                                        />
                                    </FormGroup>
                                </Col>  
                            </Row>
                            <FormGroup check className="input-field">
                                <Input id="exampleCheck" name="check" type="checkbox" />
                                <Label check for="exampleCheck">
                                    Check me out
                                </Label>
                            </FormGroup>
                            <Button>
                                Sign in
                            </Button>
                        </Form> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp;