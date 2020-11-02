import React, { Component } from "react";
import MasterMailTemplatesComponent from "./master-mail-templates.component";
import withData from "../../shared/withData/withData.component";
import { connect } from "react-redux";
import { selectIsMailTemplateFetching } from "../../../redux/masterMailTemplates/masterMailTemplates.selector";
import { fetchMailTemplatesStartAsync } from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import { createStructuredSelector } from "reselect";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";

class MasterMailTemplates extends Component {
  componentDidMount() {
    const { fetchMailTemplatesStartAsync } = this.props;
    console.log("here");
    console.log(fetchMailTemplatesStartAsync);
    fetchMailTemplatesStartAsync();
  }
  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <MasterMailTemplatesComponent></MasterMailTemplatesComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsMailTemplateFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMailTemplatesStartAsync: () =>
    dispatch(fetchMailTemplatesStartAsync({ pageSize: 1, limitSize: 10 })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterMailTemplates);
