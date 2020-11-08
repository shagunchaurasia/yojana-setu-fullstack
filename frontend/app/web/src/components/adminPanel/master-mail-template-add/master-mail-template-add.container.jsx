import React, { Component } from "react";
import MasterMailTemplateAddComponent from "./master-mail-template-add.component";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";
import {
  updateMailTemplateBody,
  fetchMailTemplateStartAsync,
} from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import {
  selectMailTemplateBody,
  fetchMailTemplateDetails,
  selectIsMailTemplateDetailFetching,
} from "../../../redux/masterMailTemplates/masterMailTemplates.selector";
import {
  selectModalDetails,
  selectModalDisplay,
} from "../../../redux/globalModal/globalModal.selector";
import {
  showModal,
  hideModal,
} from "../../../redux/globalModal/globalModal.action";
import {
  showSnackbar,
  hideSnackbar,
} from "../../../redux/globalSnackbar/globalSnackbar.action";
import { selectSnackBarDetails } from "../../../redux/globalSnackbar/globalSnackbar.selector";

class MasterMailTemplateAdd extends Component {
  constructor() {
    super();
    this.initialValues = {};
  }
  componentDidMount() {
    if (this.props.match.url.includes("edit")) {
      this.props.fetchMailTemplateStartAsync(this.props.match.params.id);
    }
  }

  saveData = (values) => {
    console.log("values from form");
    console.log(values);
    console.log(this.props);
    console.log(this.props.selectMailTemplateBody);
    // return false;
    const mailTemplateParams = {
      templateName: values.templateName,
      mailTo: values.mailTo,
      mailCC: values.mailCC,
      mailBCC: values.mailBCC,
      addedDate: new Date(),
      subject: values.subject,
      mailBody: this.props.selectMailTemplateBody,
      status: 1,
    };

    axios
      .post("http://localhost:2000/api/mailTemplates", mailTemplateParams)
      .then((response) => {
        console.log(response);

        let snackBarDetails = {
          snackType: "Success",
          snackProps: {
            open: true,
          },
        };
        this.props.showSnackbar(snackBarDetails);
        this.goBack();
      })
      .catch((error) => {
        let modalDetails = {
          modalType: "error",
          modalProps: {
            open: true,
          },
        };
        this.props.showModal(modalDetails);
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        {this.props.isMailTemplateDetailFetching ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <MasterMailTemplateAddComponent
            updateMailTemplateBody={this.props.updateMailTemplateBody}
            values={
              this.props.match.url.includes("edit")
                ? this.props.fetchMailTemplateDetails
                : {}
            }
            selectMailTemplateBody={this.props.selectMailTemplateBody}
            goBack={() => this.goBack()}
            onSubmit={(values) => this.saveData(values)}
            editProp={this.props.match.url.includes("edit") ? "edit" : "add"}
          ></MasterMailTemplateAddComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectMailTemplateBody: selectMailTemplateBody,
  modalDetails: selectModalDetails,
  selectModalDisplay: selectModalDisplay,
  selectSnackBarDetails: selectSnackBarDetails,
  isMailTemplateDetailFetching: selectIsMailTemplateDetailFetching,
  fetchMailTemplateDetails: fetchMailTemplateDetails,
});

const mapDispatchToProps = (dispatch) => ({
  updateMailTemplateBody: (mailTemplateBody) =>
    dispatch(updateMailTemplateBody(mailTemplateBody)),
  fetchMailTemplateStartAsync: (mailTemplateId) =>
    dispatch(fetchMailTemplateStartAsync({ mailTemplateId })),
  hideModal: () => dispatch(hideModal()),
  showModal: (modalDetails) => dispatch(showModal(modalDetails)),
  showSnackbar: (snackBarDetails) => dispatch(showSnackbar(snackBarDetails)),

  hideSnackbar: () => dispatch(hideSnackbar()),
});

// export default MasterMailTemplateAdd;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MasterMailTemplateAdd)
);
