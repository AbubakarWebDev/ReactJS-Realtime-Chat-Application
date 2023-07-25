import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import ProfilePictureCard from "../components/ProfilePictureCard";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Header />

      <Row className="p-4 mx-0">
        <Col xl={4} className="ps-0">
          <ProfilePictureCard avatar={user.avatar} />
        </Col>
        <Col xl={8} className="pe-0">
          <ProfileForm user={user} />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;