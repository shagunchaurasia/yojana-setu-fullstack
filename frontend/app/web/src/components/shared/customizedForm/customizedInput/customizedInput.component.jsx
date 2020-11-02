import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomizedInput = (props) => {
  return (
    <TextField
      label={props.label}
      variant={props.variant ? props.variant : "standard"}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      defaultValue={props.value}
      required={props.required ? true : false}
    />
  );
};

export default CustomizedInput;
