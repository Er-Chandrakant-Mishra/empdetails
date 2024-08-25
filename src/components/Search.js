// src/components/Search.js
import React from 'react';
import { observer } from 'mobx-react-lite';
import dataStore from '../store/DataStore';

const Search = observer(() => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    dataStore.filteredData = dataStore.data.filter(item => {
      const firstName = item.first_name?.toLowerCase() || "";
      const lastName = item.last_name?.toLowerCase() || "";
      return firstName.includes(query) || lastName.includes(query);
    });
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
    />
  );
});

export default Search;
