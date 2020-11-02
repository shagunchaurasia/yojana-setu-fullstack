import React, { Component } from "react";
import { selectMailDetailFromDB } from "../../../redux/masterMail/masterMail.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const MasterMailDetailComponent = (props) => {
  return (
    <div>
      {props.mailDetail ? (
        <div>
          This will be mail id {props.mailDetail._id}
          <div>This will be mail mailTo {props.mailDetail.mailTo} </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mailDetail: selectMailDetailFromDB,
});

export default connect(mapStateToProps, null)(MasterMailDetailComponent);
