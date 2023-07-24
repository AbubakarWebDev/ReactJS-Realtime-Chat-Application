import React from "react";
import { Row, Col } from "react-bootstrap";

import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import ProfilePictureCard from "../components/ProfilePictureCard";

const ProfilePage = () => {
  return (
    <>
      <Header />

      <Row className="p-4 mx-0">
        <Col xl={4} className="ps-0">
          <ProfilePictureCard />
        </Col>
        <Col xl={8} className="pe-0">
          <ProfileForm />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;