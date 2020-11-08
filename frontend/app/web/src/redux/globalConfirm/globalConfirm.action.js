import ConfirmActionTypes from "./globalConfirm.type";

export const showConfirm = (confirmDetails) => {
  return {
    type: ConfirmActionTypes.CONFIRM_OPEN,
    snackType: confirmDetails.snackType,
    snackProps: confirmDetails.snackProps,
  };
};

export const hideConfirm = () => {
  return {
    type: ConfirmActionTypes.CONFIRM_CLOSE,
  };
};
