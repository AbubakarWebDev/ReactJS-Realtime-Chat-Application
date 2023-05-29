import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasSidebar({ show, title, handleClose, children }) {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header className="border-bottom" closeButton={true}>
                    <Offcanvas.Title> {title} </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body> {children} </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasSidebar;