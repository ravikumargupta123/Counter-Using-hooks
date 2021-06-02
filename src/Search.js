import React from "react";

export default function Search() {
  return (
    <div>
      <form>
        <input type="text" name="search" placeholder="Search.." />
        <span className="material-icons">search</span>
      </form>
    </div>
  );
}
