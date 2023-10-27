import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchInput = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    navigate(`/?term=${encodeURIComponent(searchValue)}`);
  };

  return (
    <input
      onChange={handleSearch}
      type="search"
      value={searchTerm}
      className="search-input"
      placeholder={props.placeholder}
    />
  );
};
