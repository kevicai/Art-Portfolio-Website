import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "./Dropdown.css";

export default function Dropdown(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterItems, setFilterItems] = useState([]);

  const addFilterItems = (event) => {
    const option = event.target.innerText;
    let filterItemsCpy = [...filterItems];
    if (filterItems.includes(option)) {
      filterItemsCpy = filterItems.filter((item) => item !== option);
    } else {
      filterItemsCpy.push(option);
    }

    props.setItems(filterItemsCpy);
    setFilterItems(filterItemsCpy);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShowDropdown(false);
      }}
    >
      <div className="filter-dropdown regular-font">
        <div
          className="filter-dropdown-btn"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          {props.prompt}
          <i className="dropdown-arrow filter-arrow-down" />
        </div>

        {showDropdown && (
          <div className="filter-dropdown-content">
            {props.options.map((option, index) => (
              <div
                className="filter-dropdown-item"
                key={index}
                style={
                  filterItems.includes(option)
                    ? {
                        backgroundColor: "rgb(109, 116, 209)",
                        color: "white",
                      }
                    : { backgroundColor: "white" }
                }
                onClick={addFilterItems}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
