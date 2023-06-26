import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  console.log(currentPage, totalPages);
  const pageRange = 3; // Number of visible pages
  if (totalPages === 1) {
    return null; // Return null to hide pagination when there is only one page
  }
  const getPageNumbers = () => {
    const visiblePages = [];
    let startPage;
    let endPage;

    if (currentPage <= pageRange) {
      startPage = 1;
      endPage = Math.min(pageRange, totalPages);
    } else {
      startPage = currentPage - pageRange;
      endPage = Math.min(currentPage + pageRange, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handlePageChange = page => {
    if (page === currentPage) return;

    let newPage;

    if (page === 'prev') {
      newPage = parseInt(currentPage) - 1;
    } else if (page === 'next') {
      newPage = parseInt(currentPage) + 1;
    } else {
      newPage = parseInt(page);
    }

    onPageChange(newPage);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='koh-search-pagination'>
      <ul className=''>
        {currentPage > 1 && (
          <li className='' onClick={() => handlePageChange('prev')}>
            {'<'}
          </li>
        )}
        {pageNumbers.map(page => (
          <li
            key={page}
            className={`${parseInt(currentPage) === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </li>
        ))}
        {currentPage < totalPages && (
          <li className='' onClick={() => handlePageChange('next')}>
            {'>'}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
