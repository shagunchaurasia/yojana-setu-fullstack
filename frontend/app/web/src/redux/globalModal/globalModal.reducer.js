import ModalActionTypes from "./globalModal.type";

const INITIAL_STATE = {
  modalType: null,
  modalProps: {
    open: false,
  },
};

const globalModalReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(action.type);
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL:
      return {
        ...state,
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      };

    case ModalActionTypes.HIDE_MODAL:
      return INITIAL_STATE;

    default:
      return state;
  }
};
export default globalModalReducer;
