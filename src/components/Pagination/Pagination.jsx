import React from "react";
import "./Pagination.scss";

export default function Pagination(props) {

  let {getPages, currentPage, lastPage, onPageChange} = props;
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              قبل
            </button>
          </li>
          {getPages().map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              {page === "..." ? (
                <span className="page-link">...</span>
              ) : (
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
          <li className={`page-item ${currentPage === lastPage && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              بعد
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
