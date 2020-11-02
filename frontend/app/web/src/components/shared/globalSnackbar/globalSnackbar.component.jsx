import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  showSnackbar,
  hideSnackbar,
} from "./../../../redux/globalSnackbar/globalSnackbar.action";
import { selectSnackBarDetails } from "./../../../redux/globalSnackbar/globalSnackbar.selector";

function Alert(props) {
  return <MuiAlert elevation={16} variant="filled" {...props} />;
}
const GlobalSnackbar = (props) => {
  console.log("props inside global snackbar");
  console.log(props);

  const handleClick = () => {
    let snackBarDetails = {
      snackType: "Success",
      snackProps: {
        open: true,
      },
    };
    props.showSnackbar(snackBarDetails);
  };
  return (
    <div>
      <button onClick={handleClick}>Show snackbar</button>
      <Snackbar
        open={props.selectSnackBarDetails.snackProps.open}
        autoHideDuration={5000}
        onClose={props.hideSnackbar}
      >
        <Alert onClose={props.hideSnackbar} severity="success">
          This is a success message !{props.messageToDisplay}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectSnackBarDetails: selectSnackBarDetails,
});

const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (snackBarDetails) => dispatch(showSnackbar(snackBarDetails)),
  hideSnackbar: () => dispatch(hideSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSnackbar);
