import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navigation = () => {
    function OffCanvasExample({ name, ...props }) {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="primary" onClick={handleShow} className="me-2">
                    {"start"}
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>전체메뉴</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text,
                        images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

    return (
        <div>
            <>
                {["start"].map((placement, idx) => (
                    <OffCanvasExample key={idx} placement={placement} name={placement} />
                ))}
            </>
        </div>
    );
};

export default Navigation;
