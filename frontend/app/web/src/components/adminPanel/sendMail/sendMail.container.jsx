import React, { Component } from "react";
import withData from "./../../shared/withData/withData.component";
import MasterSendMailComponent from "./sendMail.component";

const MasterSendMail = (props) => {
  return (
    <div>
      <MasterSendMailComponent></MasterSendMailComponent>
    </div>
  );
};
// const MasterSendMail = (props) => {
//   return <div></div>;
// };

// export default withData(
//   MasterSendMailComponent,
//   "http://localhost:2000/api/mails"
// );

export default MasterSendMail;
