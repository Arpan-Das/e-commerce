import React, { Component } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser, faMap } from "@fortawesome/free-solid-svg-icons";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.changeAddressHandler=this.changeAddressHandler.bind(this);
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changeContactHandler=this.changeContactHandler.bind(this);
        this.save=this.save.bind(this);
    }
    initialState = {
        name:'', email:'', password:'', contact:''
    };

    save = (e) => {
       
        alert('succesfully added');

    }
    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    changeContactHandler = (event) => {
        this.setState({ phone: event.target.value });
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const { name, email, password, phone, address } = this.state;

        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faUserPlus} /> Register
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="name" value={name} onChange={this.changeNameHandler}
                                            className={"bg-dark text-white"} placeholder="Enter Name" />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.changeEmailHandler}
                                            className={"bg-dark text-white"} placeholder="Enter Email Address" />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.changePasswordHandler}
                                            className={"bg-dark text-white"} placeholder="Enter Password" />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="contact" value={phone} onChange={this.changeContactHandler}
                                            className={"bg-dark text-white"} placeholder="Enter Contact Number" />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faMap} /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl autoComplete="off" type="text" name="address" value={address} onChange={this.changeAddressHandler}
                                            className={"bg-dark text-white"} placeholder="Enter Address" />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ "text-align": "right" }}>
                            <Button size="sm" type="button" variant="success" onClick={this.save}
                                disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faUserPlus} /> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}