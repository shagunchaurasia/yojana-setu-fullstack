import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

import {
  showModal,
  hideModal,
} from "./../../../redux/globalModal/globalModal.action";
import {
  selectModalDetails,
  selectModalDisplay,
  selectModalType,
} from "./../../../redux/globalModal/globalModal.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const GlobalModal = (props) => {
  console.log("global modal props inside component");
  console.log(props);
  if (props.selectModalType == "info") {
    return (
      <Dialog
        onClose={props.hideModal}
        aria-labelledby="customized-dialog-title"
        open={props.selectModalDisplay}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.hideModal}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Successfully Added</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.hideModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  if (props.selectModalType == "error") {
    return (
      <Dialog
        open={props.selectModalDisplay}
        onClose={props.hideModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={props.hideModal}>
            Disagree
          </Button>
          <Button color="primary" autoFocus onClick={props.hideModal}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = createStructuredSelector({
  modalDetails: selectModalDetails,
  selectModalDisplay: selectModalDisplay,
  selectModalType: selectModalType,
});
const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalDetails) => dispatch(showModal(modalDetails)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GlobalModal)
);
