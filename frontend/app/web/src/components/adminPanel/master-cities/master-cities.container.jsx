import React from "react";
import MasterCitiesComponent from "./master-cities.component";
import withData from "../../shared/withData/withData.component";
import {
  crudActionCreator,
  createCrudReducers,
} from "./../../../redux/apiCRUD";

const someThingsActionCreators = new crudActionCreator(
  "http://localhost:2000/api/city",
  "SOME_THING"
);

const someThingsReducer = createCrudReducers(
  someThingsActionCreators
  // methods,
  // resetAllDataActionType,
  // mergeDataChanges,
  // initialDataState
);

console.log(someThingsActionCreators);
const MasterCities = (props) => {
  return (
    <div>
      <MasterCitiesComponent data={props.data} />
    </div>
  );
};

export default withData(MasterCities, "http://localhost:2000/api/city");
