// src/components/Pagination.js
import React from 'react';
import dataStore from '../store/DataStore';
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {
  const { page, totalPages } = dataStore;

  const handlePrev = () => {
    if (page > 1) {
      dataStore.setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      dataStore.setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>Previous</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
});

export default Pagination;
