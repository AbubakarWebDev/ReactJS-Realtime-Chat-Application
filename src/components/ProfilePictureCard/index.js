import React from 'react';
import { Card, Button } from "react-bootstrap";

import styles from "./style.module.scss";
const { profilePic } = styles;

function ProfilePictureCard() {
    return (
        <Card className="mb-4 mb-xl-0">
            <Card.Header>Profile Picture</Card.Header>

            <Card.Body className="text-center">
                <div className={profilePic}>
                    <img
                        src="http://bootdey.com/img/Content/avatar/avatar1.png"
                        className="rounded-circle"
                        alt="profile-picture"
                    />
                </div>

                <div className="small font-italic text-muted mb-3"> JPG or PNG no larger than 5 MB </div>
    
                <Button variant="primary" type="button"> Upload new image </Button>
            </Card.Body>
        </Card>
    );
}

export default React.memo(ProfilePictureCard);