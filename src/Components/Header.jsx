import React, { useState } from "react";

function Header(props) {

  function handleChange(event) {
    props.searchFunction(event.target.value);
  }

  return (
    <>
      <div className="header">
        <h1>Notes Keeper</h1>
        <input
          type="text"
          className="search-input"
          placeholder=" &#61442; Search"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Header;
