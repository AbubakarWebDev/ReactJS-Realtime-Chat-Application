import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// import RequestLoader from "./../RequestLoader";
// import { login, authActions } from "../../store/slices/authSlice";

const ProfilePage = () => {
  return (
    <Container className="px-4 mt-4">
      <Row>
        <Col xl={4}>
          {/* Profile picture card */}
          <Card className="mb-4 mb-xl-0">
            <Card.Header>Profile Picture</Card.Header>
            <Card.Body className="text-center">
              {/* Profile picture image */}
              <img
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              {/* Profile picture help block */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* Profile picture upload button */}
              <Button variant="primary" type="button">
                Upload new image
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          {/* Account details card */}
          <Card className="mb-4">
            <Card.Header>Account Details</Card.Header>
            <Card.Body>
              <Form>
                {/* Form Group (username) */}
                <Form.Group className="mb-3">
                  <Form.Label className="small mb-1" htmlFor="inputUsername">
                    Username (how your name will appear to other users on the
                    site)
                  </Form.Label>
                  <Form.Control
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    defaultValue="username"
                  />
                </Form.Group>
                {/* Form Row */}
                <Row className="gx-3 mb-3">
                  {/* Form Group (first name) */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        className="small mb-1"
                        htmlFor="inputFirstName"
                      >
                        First name
                      </Form.Label>
                      <Form.Control
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                        defaultValue="Valerie"
                      />
                    </Form.Group>
                  </Col>
                  {/* Form Group (last name) */}
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
                {/* Form Row */}
                <Row className="gx-3 mb-3">
                  {/* Form Group (organization name) */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small mb-1" htmlFor="inputOrgName">
                        Organization name
                      </Form.Label>
                      <Form.Control
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your organization name"
                        defaultValue="Start Bootstrap"
                      />
                    </Form.Group>
                  </Col>
                  {/* Form Group (location) */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        className="small mb-1"
                        htmlFor="inputLocation"
                      >
                        Location
                      </Form.Label>
                      <Form.Control
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        defaultValue="San Francisco, CA"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Form Group (email address) */}
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
                {/* Form Row */}
                <Row className="gx-3 mb-3">
                  {/* Form Group (phone number) */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </Form.Label>
                      <Form.Control
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        defaultValue="555-123-4567"
                      />
                    </Form.Group>
                  </Col>
                  {/* Form Group (birthday) */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        className="small mb-1"
                        htmlFor="inputBirthday"
                      >
                        Birthday
                      </Form.Label>
                      <Form.Control
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        defaultValue="06/10/1988"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Save changes button */}
                <Button variant="primary" type="button">
                  Save changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
