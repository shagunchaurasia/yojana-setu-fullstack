import React, { Component } from "react";
import MasterMailComponent from "./master-mail.component";
import { connect } from "react-redux";
import { selectIsMailsFetching } from "../../../redux/masterMail/masterMail.selector";
import { fetchMailsStartAsync } from "../../../redux/masterMail/masterMail.action";
import { createStructuredSelector } from "reselect";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";

class MasterMailContainer extends Component {
  componentDidMount() {
    const { fetchMailsStartAsync } = this.props;
    fetchMailsStartAsync();
  }
  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <MasterMailComponent></MasterMailComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsMailsFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMailsStartAsync: () => dispatch(fetchMailsStartAsync()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterMailContainer);
