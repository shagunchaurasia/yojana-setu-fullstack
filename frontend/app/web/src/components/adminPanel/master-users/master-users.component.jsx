import React, { Component } from "react";
import CustomizedTable from "../../shared/customizedTable/customizedTable.component";
import axios from "axios";

const MasterUsers = (props) => {
  axios.get("http://localhost:2000/");
  return (
    <div>
      <CustomizedTable></CustomizedTable>
    </div>
  );
};

export default MasterUsers;
