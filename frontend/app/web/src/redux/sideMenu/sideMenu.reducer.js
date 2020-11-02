import SideMenuActionTypes from "./sideMenu.type";

const INITIAL_STATE = {
  open: true,
  menuSelected: "",
};

const sideMenuReducer = (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case SideMenuActionTypes.TOGGLE_SIDE_MENU:
      return {
        ...state,
        open: !state.open,
      };
    default:
      return state;
  }
};

export default sideMenuReducer;
