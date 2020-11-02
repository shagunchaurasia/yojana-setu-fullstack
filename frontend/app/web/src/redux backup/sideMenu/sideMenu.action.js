import SideMenuActionTypes from "./sideMenu.type";

export const toggleSideMenu = () => {
  return {
    type: SideMenuActionTypes.TOGGLE_SIDE_MENU,
  };
};
