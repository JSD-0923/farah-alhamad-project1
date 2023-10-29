import React from "react";

export const SelectInput = (props) => {
  const handleSelect = (e) => {
    props.handleSelectChange(e, props.name);
  };
  return (
    <div className="select-wrapper">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <select
        className={props.customClass}
        name={props.name}
        id={props.id}
        onChange={(e) => handleSelect(e)}
      >
        {props.name === "filter" && <option value="">All</option>}
        {props.values.map((value, id) => (
          <option value={value.value} key={id}>
            {value.optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};
