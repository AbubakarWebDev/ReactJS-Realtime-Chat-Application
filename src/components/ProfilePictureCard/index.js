import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';

import { updateUserAvatar } from '../../store/slices/userSlice';
import RequestLoader from './../RequestLoader';

import styles from "./style.module.scss";
const { profilePic, fileInput } = styles;

function ProfilePictureCard({ avatar }) {
    const fileInputRef = useRef(null);
    const controller = useRef({ abort: () => { } });

    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedImage, setSelectedImage] = useState(avatar);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

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

        const maxSize = 2 * 1024 * 1024; // 5 MB in bytes
        if (file.size > maxSize) {
            alert("Please upload an image smaller than 2 MB.");
            event.preventDefault();
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);

        setFile(file);
    }

    function updateProfile() {
        const promise = dispatch(updateUserAvatar({ avatar: file }));
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
        <Card className="mb-4 mb-xl-0">
            <Card.Header>Profile Picture</Card.Header>

            <Card.Body className="text-center position-relative">
                {error && <Alert variant="danger"> <b> Error: {error.message} </b> </Alert>}

                {(!error && showAlert) && (
                    <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                        <b> Your Avatar has been Updated Successfully. </b>
                    </Alert>
                )}

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

                <div className="small font-italic text-muted mb-3"> JPG or PNG no larger than 2 MB </div>

                <Button variant="primary" type="button" onClick={updateProfile}> Update Profile Avatar </Button>

                {loading && <RequestLoader />}
            </Card.Body>
        </Card>
    );
}

export default React.memo(ProfilePictureCard);