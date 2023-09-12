import React from "react";
import Navigation from "./Navigation";
import MemberList from "./MemberList";
import PartnerList from "./PartnerList";

const Index = () => {
    return (
        <div>
            <Navigation />
            <MemberList />
            <PartnerList />
        </div>
    );
};

export default Index;
