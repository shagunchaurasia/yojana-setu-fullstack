import { createSelector } from "reselect";

const selectGlobalModal = (state) => state.globalModal;

export const selectModalDisplay = createSelector(
  [selectGlobalModal],
  (modalDetails) => {
    console.log("Here inside select modal display");
    console.log(modalDetails);
    return modalDetails.modalProps.open;
  }
);
export const selectModalDetails = createSelector(
  [selectGlobalModal],
  (modalDetails) => {
    return modalDetails.modalProps;
  }
);

export const selectModalType = createSelector(
  [selectGlobalModal],
  (modalDetails) => {
    return modalDetails.modalType;
  }
);
