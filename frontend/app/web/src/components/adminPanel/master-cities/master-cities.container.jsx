import React from "react";
import MasterCitiesComponent from "./master-cities.component";
import withData from "../../shared/withData/withData.component";

const MasterCities = (props) => {
  return (
    <div>
      <MasterCitiesComponent data={props.data} />
    </div>
  );
};

export default withData(MasterCities, "http://localhost:2000/api/city");
