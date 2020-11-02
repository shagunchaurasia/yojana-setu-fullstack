import MailTemplatesActionTypes from "./masterMailTemplates.type";
import axios from "axios";

export const fetchMailTemplatesStart = () => {
  return {
    type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_START,
  };
};

export const fetchMailTemplatesSuccess = (mailTemplates) => ({
  type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_SUCCESS,
  payload: mailTemplates,
});

export const fetchMailTemplatesFailure = (errorMessage) => ({
  type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_FAILURE,
  payload: errorMessage,
});

export const fetchMailTemplatesStartAsync = ({ pageSize, limitSize }) => {
  return (dispatch) => {
    dispatch(fetchMailTemplatesStart());

    axios
      .get(
        `http://localhost:2000/api/mailTemplates?currentPage=${pageSize}&limitSize=${limitSize}`
      )
      .then((response) => {
        dispatch(fetchMailTemplatesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMailTemplatesFailure(error.message));
      });
  };
};

export const updateMailTemplateBody = (mailTemplateBody) => {
  return {
    type: MailTemplatesActionTypes.UPDATE_MAIL_TEMPLATE_BODY,
    payload: mailTemplateBody,
  };
};

export const updateMailTemplateParams = ({ currentPage }) => {
  return {
    type: MailTemplatesActionTypes.UPDATE_MAIL_TEMPLATE_PARAMS,
    payload: currentPage,
  };
};
