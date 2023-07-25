import React, { useRef, useState } from 'react';
import { Card, Button } from "react-bootstrap";

import styles from "./style.module.scss";
const { profilePic, fileInput } = styles;

function ProfilePictureCard({ avatar }) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(avatar);

    function handleUpload(event) {
        if (event.target.files.length === 0) {
            alert("Please select an image to upload.");
            event.preventDefault();
            return;
        }

        const file = event.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a JPG or PNG image.");
            event.preventDefault();
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (file.size > maxSize) {
            alert("Please upload an image smaller than 5 MB.");
            event.preventDefault();
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
    }

    return (
        <Card className="mb-4 mb-xl-0">
            <Card.Header>Profile Picture</Card.Header>

            <Card.Body className="text-center">
                <div className={profilePic} onClick={() => fileInputRef.current.click()}>
                    <img
                        className="rounded-circle"
                        alt="profile-picture"
                        src={selectedImage}
                    />
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className={fileInput}
                    onChange={handleUpload}
                />

                <div className="small font-italic text-muted mb-3"> JPG or PNG no larger than 5 MB </div>

                <Button variant="primary" type="button"> Update Profile Avatar </Button>
            </Card.Body>
        </Card>
    );
}

export default React.memo(ProfilePictureCard);