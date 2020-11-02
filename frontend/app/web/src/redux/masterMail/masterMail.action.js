import MailActionTypes from "./masterMail.type";
import axios from "axios";

export const fetchMailsStart = () => {
  return {
    type: MailActionTypes.FETCH_MAILS_START,
  };
};

export const fetchMailSuccess = (mails) => {
  return {
    type: MailActionTypes.FETCH_MAILS_SUCCESS,
    payload: mails,
  };
};

export const fetchMailsFailure = (errorMessage) => {
  return {
    type: MailActionTypes.FETCH_MAILS_FAILURE,
    payload: errorMessage,
  };
};

export const fetchMailsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchMailsStart());
    axios
      .get("http://localhost:2000/api/mail")
      .then((response) => {
        dispatch(fetchMailSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMailsFailure(error.message));
      });
  };
};

export const fetchMailDetailStart = () => {
  return {
    type: MailActionTypes.FETCH_MAIL_DETAIL_START,
  };
};

export const fetchMailDetailSuccess = (mailDetail) => {
  return {
    type: MailActionTypes.FETCH_MAIL_DETAIL_SUCCESS,
    payload: mailDetail,
  };
};

export const fetchMailDetailFailure = (errorMessage) => {
  return {
    type: MailActionTypes.FETCH_MAIL_DETAIL_FAILURE,
    payload: errorMessage,
  };
};

export const fetchMailDetailStartAsync = (mailId) => {
  return (dispatch) => {
    dispatch(fetchMailDetailStart());
    axios
      .get("http://localhost:2000/api/mail/" + mailId)
      .then((response) => {
        dispatch(fetchMailDetailSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMailDetailFailure(error.message));
      });
  };
};
