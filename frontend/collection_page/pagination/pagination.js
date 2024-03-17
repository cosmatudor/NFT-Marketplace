import React from 'react'

import Style from "./pagination.module.css";

const Pagination = ({ totalNfts, nftsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalNfts / nftsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className={Style.pagination}>
            {
                pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={page == currentPage ? `${Style}.active` : ''}
                    >
                        {page}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination;
