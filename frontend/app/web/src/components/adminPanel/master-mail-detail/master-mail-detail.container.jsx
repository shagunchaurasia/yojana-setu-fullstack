import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMailDetailStartAsync } from "../../../redux/masterMail/masterMail.action";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";
import { selectIsMailDetailFetched } from "../../../redux/masterMail/masterMail.selector";
import { createStructuredSelector } from "reselect";
import MasterMailDetailComponent from "./master-mail-detail.component";
class MasterMailDetailContainer extends Component {
  constructor(props) {
    super(props);
    console.log("props.match.params");
    console.log(props.match.params);
  }
  componentDidMount() {
    const { fetchMailDetailStartAsync } = this.props;
    console.log("componentdidmount props.match.params");
    console.log(this.props.match.params);
    fetchMailDetailStartAsync(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {this.props.isMailDetailFetching ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <MasterMailDetailComponent></MasterMailDetailComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isMailDetailFetching: selectIsMailDetailFetched,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMailDetailStartAsync: (mailId) =>
    dispatch(fetchMailDetailStartAsync(mailId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MasterMailDetailContainer));
