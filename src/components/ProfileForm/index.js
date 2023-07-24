import React from 'react';
import { Row, Col, Card, Button, Form } from "react-bootstrap";

function ProfileForm() {
    return (
        <Card className="mb-4">
            <Card.Header>Account Details</Card.Header>

            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="small mb-1" htmlFor="inputUsername"> Username </Form.Label>

                        <Form.Control
                            type="text"
                            id="inputUsername"
                            defaultValue="username"
                            placeholder="Enter your username"
                        />
                    </Form.Group>

                    <Row className="gx-3">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label
                                    className="small mb-1"
                                    htmlFor="inputFirstName"
                                >
                                    First name
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    id="inputFirstName"
                                    defaultValue="Valerie"
                                    placeholder="Enter your first name"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label
                                    className="small mb-1"
                                    htmlFor="inputLastName"
                                >
                                    Last name
                                </Form.Label>

                                <Form.Control
                                    id="inputLastName"
                                    type="text"
                                    placeholder="Enter your last name"
                                    defaultValue="Luna"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label
                            className="small mb-1"
                            htmlFor="inputEmailAddress"
                        >
                            Email address
                        </Form.Label>

                        <Form.Control
                            id="inputEmailAddress"
                            type="email"
                            placeholder="Enter your email address"
                            defaultValue="name@example.com"
                        />
                    </Form.Group>

                    <Button variant="primary" type="button">
                        Save changes
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default React.memo(ProfileForm);