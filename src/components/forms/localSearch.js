import React from "react";

export default ({ keyword, setKeyword }) => {

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
      <input
        type="text"
        value={keyword}
        onChange={handleSearchChange}
        placeholder="Filter"
        className="form-control"
      />
  );
};
