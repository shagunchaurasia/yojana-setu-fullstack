import React, { Component } from "react";

const Footer = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: "50px",
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        zIndex: 10,
      }}
    >
      Footer
    </div>
  );
};

export default Footer;
