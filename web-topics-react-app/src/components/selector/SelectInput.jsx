import React from "react";

export const SelectInput = (props) => {
  return (
    <div className="select-wrapper">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <select className={props.customClass} name={props.name} id={props.id}>
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
