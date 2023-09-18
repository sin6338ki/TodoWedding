import React, { useEffect, useState } from "react";
import PaginationComp from "react-bootstrap/Pagination";

const Pagination = ({ total, limits, page, setPage }) => {
    const numPages = Math.ceil(total / limits);
    const [active, setActive] = useState(1);
    let items = [];

    const moveToPage = (e) => {
        console.log("moveToPage key : ", e.target.innerText);
        setPage(e.target.innerText);
    };

    useEffect(() => {
        console.log("total : ", total);
        console.log("numPages : ", numPages);
        setActive(page);
    }, [total, numPages, page]);

    for (let number = 1; number <= numPages; number++) {
        items.push(
            <PaginationComp.Item
                key={number}
                active={number === active}
                onClick={(e) => {
                    moveToPage(e);
                }}
            >
                {number}
            </PaginationComp.Item>
        );
    }
    return (
        <div>
            <PaginationComp size="sm">{items}</PaginationComp>
        </div>
    );
};

export default Pagination;
