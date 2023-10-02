/**
 * admin page - 업체리스트 페이징 처리
 * 작성자 : 신지영
 */

import React, { useEffect, useState } from "react";
import PaginationComp from "react-bootstrap/Pagination";

const Pagination = ({ total, limits, page, setPage }) => {
    const numPages = Math.ceil(total / limits);
    const [active, setActive] = useState(1);
    let items = [];

    const moveToPage = (e) => {
        setPage(e.target.innerText);
    };

    useEffect(() => {
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
