import React from "react";
import withData from "../../shared/withData/withData.component";
import MasterSchemeTypesComponent from "./master-scheme-types.component.jsx";

const MasterSchemeTypes = (props) => {
  return (
    <div>
      <MasterSchemeTypesComponent
        data={props.data}
      ></MasterSchemeTypesComponent>
    </div>
  );
};

export default withData(
  MasterSchemeTypes,
  "http://localhost:2000/api/schemeTypes"
);
