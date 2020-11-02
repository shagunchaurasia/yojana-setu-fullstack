import SnackBarActionTypes from "./globalSnackbar.type";

export const showSnackbar = (snackBarDetails) => {
  return {
    type: SnackBarActionTypes.SNACKBAR_OPEN,
    snackType: snackBarDetails.snackType,
    snackProps: snackBarDetails.snackProps,
  };
};

export const hideSnackbar = () => {
  return {
    type: SnackBarActionTypes.SNACKBAR_CLOSE,
  };
};
