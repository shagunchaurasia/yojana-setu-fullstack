import React, { Component } from "react";
import MasterMailTemplateAddComponent from "./master-mail-template-add.component";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { Formik, isPromise } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import CustomizedButton from "../../shared/customizedForm/customizedButton/customizedButton.component";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";

import CustomizedInput from "../../shared/customizedForm/customizedInput/customizedInput.component";
import {
  updateMailTemplateBody,
  fetchMailTemplateStartAsync,
} from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import {
  selectMailTemplateBody,
  // selectMailTemplatesFromDB,
  // fetchMailTemplateDetails,
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

    const mailTemplateParams = {
      templateName: values.templateName,
      mailTo: values.mailTo,
      mailCC: values.mailCC,
      mailBCC: values.mailBCC,
      addedDate: new Date(),
      subject: values.subject,
      mailBody: values.mailBody,
      status: 1,
    };

    axios
      .post("http://localhost:2000/api/mailTemplates", mailTemplateParams)
      .then((response) => {
        console.log(response);
        let modalDetails = {
          modalType: "info",
          modalProps: {
            open: true,
          },
        };
        this.props.showModal(modalDetails);
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
    // onSubmit={(values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);

    //       const mailTemplateBody = {
    //         templateName: values.templateName,
    //         mailTo: values.mailTo,
    //         mailCC: values.mailCC,
    //         mailBCC: values.BCC,
    //         // attachment: values.,
    //         addedDate: new Date(),
    //         subject: values.subject,
    //         mailBody: values.mailBody,
    //         status: 1,
    //         // signature: values.,
    //       };

    //       axios
    //         .post("http://localhost:2000/api/mailTemplates", mailTemplateBody)
    //         .then((response) => {
    //           console.log(response);
    //           if (response.data.status == true) {
    //             let modalDetails = {
    //               modalType: "info",
    //               modalProps: {
    //                 open: true,
    //               },
    //             };
    //             props.showModal(modalDetails);
    //             let snackBarDetails = {
    //               snackType: "Success",
    //               snackProps: {
    //                 open: true,
    //               },
    //             };
    //             props.showSnackbar(snackBarDetails);
    //             // props.history.goBack();
    //           } else {
    //             alert("error");
    //             let modalDetails = {
    //               modalType: "error",
    //               modalProps: {
    //                 open: true,
    //               },
    //             };
    //             props.showModal(modalDetails);
    //           }
    //         })
    //         .catch((error) => {
    //           let modalDetails = {
    //             modalType: "error",
    //             modalProps: {
    //               open: true,
    //             },
    //           };
    //           props.showModal(modalDetails);
    //         });
    //     }, 400);
    //   }}
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
            // values={
            //   this.props.match.url.includes("edit")
            //     ? this.props.fetchMailTemplateDetails
            //     : {}
            // }
            goBack={() => this.goBack()}
            onSubmit={(values) => this.saveData(values)}
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
  // fetchMailTemplateDetails: fetchMailTemplateDetails,
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
