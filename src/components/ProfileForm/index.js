import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { updateUserProfile } from '../../store/slices/userSlice';
import RequestLoader from './../RequestLoader';

const inpElem = {
    username: {
        id: "username",
        type: 'text',
        name: "username",
        label: "Username",
        placeholder: "Enter Username",
    },
    firstName: {
        id: "firstName",
        type: 'text',
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
    },
    lastName: {
        id: "lastName",
        type: 'text',
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter last name",
    },
    email: {
        id: "email",
        name: "email",
        type: 'email',
        label: "Email",
        placeholder: "Enter email",
    }
};

const schema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    username: yup.string().required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(25, 'Username cannot exceed 16 characters')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain alphanumeric characters and underscores'
        ),
    email: yup.string().required('This field is required').email('Please enter a valid email address'),
});

function ProfileForm({ user: currentUser }) {
    const controller = useRef({ abort: () => { } });

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.user);

    const [showAlert, setShowAlert] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email
        },
    });

    function onSubmit(data) {
        const promise = dispatch(updateUserProfile(data));
        controller.current.abort = promise.abort;

        promise.unwrap().then(() => {
            setShowAlert(true);
        });
    }

    useEffect(() => {
        return () => {
            controller.current.abort();
        }
    }, []);

    return (
        <Card className="mb-4">
            <Card.Header>Account Details</Card.Header>

            <Card.Body className='position-relative'>
                {error && <Alert variant="danger"> <b> Error: {error.message} </b> </Alert>}

                {(!error && showAlert) && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        <b> Your Profile has been Updated Successfully. </b>
                    </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small mb-1" htmlFor={inpElem.username.id}> {inpElem.username.label} </Form.Label>

                        <Form.Control
                            id={inpElem.username.id}
                            type={inpElem.username.type}
                            placeholder={inpElem.username.placeholder}
                            {...register(inpElem.username.name)}
                        />

                        {errors[inpElem.username.name] && (
                            <b className="text-danger d-block mt-1">{errors[inpElem.username.name].message}</b>
                        )}
                    </Form.Group>

                    <Row className="gx-3">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small mb-1" htmlFor={inpElem.firstName.id}> {inpElem.firstName.label} </Form.Label>

                                <Form.Control
                                    id={inpElem.firstName.id}
                                    type={inpElem.firstName.type}
                                    placeholder={inpElem.firstName.placeholder}
                                    {...register(inpElem.firstName.name)}
                                />

                                {errors[inpElem.firstName.name] && (
                                    <b className="text-danger d-block mt-1">{errors[inpElem.firstName.name].message}</b>
                                )}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small mb-1" htmlFor={inpElem.lastName.id}> {inpElem.lastName.label} </Form.Label>

                                <Form.Control
                                    id={inpElem.lastName.id}
                                    type={inpElem.lastName.type}
                                    placeholder={inpElem.lastName.placeholder}
                                    {...register(inpElem.lastName.name)}
                                />

                                {errors[inpElem.lastName.name] && (
                                    <b className="text-danger d-block mt-1">{errors[inpElem.lastName.name].message}</b>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="small mb-1" htmlFor={inpElem.email.id}> {inpElem.email.label} </Form.Label>

                        <Form.Control
                            id={inpElem.email.id}
                            type={inpElem.email.type}
                            placeholder={inpElem.email.placeholder}
                            {...register(inpElem.email.name)}
                        />

                        {errors[inpElem.email.name] && (
                            <b className="text-danger d-block mt-1">{errors[inpElem.email.name].message}</b>
                        )}
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>

                    {loading && <RequestLoader />}
                </Form>
            </Card.Body>
        </Card>
    );
}

export default React.memo(ProfileForm);