import React from "react";
import Card from "react-bootstrap/Card";

const Dashboard = ({ partners, members }) => {
    return (
        <div className="flex flex-row">
            <Card style={{ width: "16rem" }} className="m-2">
                <Card.Body>
                    <Card.Title>{members.length}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">총 이용자수</Card.Subtitle>
                    {/* <Card.Text>{}</Card.Text> */}
                </Card.Body>
            </Card>
            <Card style={{ width: "16rem" }} className="m-2">
                <Card.Body>
                    <Card.Title>{partners.length}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">총 제휴업체수</Card.Subtitle>
                    {/* <Card.Text>{}</Card.Text> */}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;
