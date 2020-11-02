import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const CustomizedButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant={props.variant ? props.variant : "contained"}
      color={props.color ? props.color : "primary"}
      onClick={
        props.onClickHandler
          ? () => {
              // alert("clicked");
              props.onClickHandler();
            }
          : ""
      }
      style={props.style}
      type={props.type ? props.type : "button"}
      disabled={props.disabled ? props.disabled : false}
      size={props.size ? props.size : "small"}
      className={classes.margin}
    >
      {props.children}
    </Button>
  );
};

export default CustomizedButton;
