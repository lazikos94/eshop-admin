const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? "is-current" : "";
        pageNumbers.push(
          <li key={i}>
            <a
              className={`pagination-link ${isActive}`}
              aria-label={`Goto page ${i}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return pageNumbers;
  };
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className="pagination-previous"
        onClick={() => {
          if (currentPage == 1) return;
          handlePageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </a>
      <a
        className="pagination-next"
        onClick={() => {
          if (currentPage == totalPages) return;
          handlePageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        Next page
      </a>
      <ul className="pagination-list">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
