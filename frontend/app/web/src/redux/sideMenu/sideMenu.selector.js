import { createSelector } from "reselect";

const selectSideMenuToggle = (state) => state.sideMenu;

export const selectSideToggleValue = createSelector(
  [selectSideMenuToggle],
  (sideMenuValues) => {
    return sideMenuValues.open;
  }
);
