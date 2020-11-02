import SnackBarActionTypes from "./globalSnackbar.type";

const INITIAL_STATE = {
  snackType: null,
  snackProps: {
    open: false,
  },
};

const globalSnackbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SnackBarActionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        snackType: action.snackType,
        snackProps: action.snackProps,
      };
    case SnackBarActionTypes.SNACKBAR_CLOSE:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default globalSnackbarReducer;
