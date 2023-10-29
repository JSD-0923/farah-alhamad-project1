import React, { useState } from "react";

export const SearchInput = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  let debounceSearch;

  const handleSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    clearTimeout(debounceSearch);
    debounceSearch = setTimeout(() => {
      props.handleSearchChange(e, "term");
    }, 300);
  };

  return (
    <input
      onChange={(e) => handleSearch(e)}
      type="search"
      value={searchTerm}
      className="search-input"
      placeholder={props.placeholder}
    />
  );
};
