import React from "react";
import MasterSchemesComponent from "./master-schemes.component";
import withData from "../../shared/withData/withData.component";

const MasterSchemes = (props) => {
  return (
    <div>
      <MasterSchemesComponent data={props.data} />
    </div>
  );
};

export default withData(MasterSchemes, "http://localhost:2000/api/schemes");
