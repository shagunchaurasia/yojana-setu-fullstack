import { createSelector } from "reselect";

const selectSnackBar = (state) => state.globalSnackBar;

export const selectSnackBarDetails = createSelector(
  [selectSnackBar],
  (snackBarDetails) => {
    return snackBarDetails;
  }
);
