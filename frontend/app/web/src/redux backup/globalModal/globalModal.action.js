import ModalActionTypes from "./globalModal.type";

export const showModal = (modalDetails) => {
  return {
    type: ModalActionTypes.SHOW_MODAL,
    modalProps: modalDetails.modalProps,
    modalType: modalDetails.modalType,
  };
};

export const hideModal = () => {
  return {
    type: ModalActionTypes.HIDE_MODAL,
  };
};
