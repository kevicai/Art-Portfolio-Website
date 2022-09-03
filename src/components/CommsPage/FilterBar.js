import React from "react";
import "./FilterBar.css";
import Dropdown from "./Dropdown";
import filterBackrgound from "../../icons/filter-bar-background.svg";
import { AiOutlineSearch } from "react-icons/ai";

export default function FilterBar(props) {
  const handleInputChange = (event) => {
    props.setSearchInput(event.target.value);
  };

  return (
    <div
      className="filter-container"
      style={{ backgroundImage: `url(${filterBackrgound})` }}
    >
      <div className="search-bar">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          className="search-bar-input regular-font"
          value={props.searchInput}
          onChange={handleInputChange}
        />
      </div>

      <div className="dropdown-row">
        <Dropdown
          prompt={"Type"}
          options={["Profile Picture", "Half Body", "Full Body"]}
          setItems={props.setCommType}
        />
        <Dropdown
          prompt={"Stage"}
          options={["New", "In Progress", "Completed"]}
          setItems={props.setCommStage}
        />
        <Dropdown
          prompt={"Sort By"}
          options={["Your Requests", "Date Old"]}
          setItems={props.setCommSort}
        />
      </div>
    </div>
  );
}
