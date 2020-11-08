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

export const fetchMailTemplateStart = () => {
  return {
    type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_START,
  };
};

export const fetchMailTemplateSuccess = (mailTemplate) => ({
  type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_SUCCESS,
  payload: mailTemplate,
});

export const fetchMailTemplateFailure = (errorMessage) => ({
  type: MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_FAILURE,
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
export const fetchMailTemplateStartAsync = ({ mailTemplateId }) => {
  return (dispatch) => {
    dispatch(fetchMailTemplateStart());

    axios
      .get(`http://localhost:2000/api/mailTemplates/${mailTemplateId}`)
      .then((response) => {
        dispatch(fetchMailTemplateSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMailTemplateFailure(error.message));
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

export const deleteMailTemplateStart = () => {
  return {
    type: MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_START,
  };
};

export const deleteMailTemplateSuccess = (deleteResult) => ({
  type: MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_SUCCESS,
  payload: deleteResult,
});

export const deleteMailTemplateFailure = (errorMessage) => ({
  type: MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_FAILURE,
  payload: errorMessage,
});

export const deleteMailTemplateAsyncTest = ({ mailTemplateId }) => {
  console.log("deleteMailTemplateAsyncTest");
  console.log(mailTemplateId);
};
export const deleteMailTemplateAsync = ({ mailTemplateId }) => {
  console.log("Inside deleteMailTemplateAsync");
  console.log(mailTemplateId);

  console.log("before Staring");

  return (dispatch) => {
    console.log("Staring");
    dispatch(deleteMailTemplateStart());

    axios
      .delete(`http://localhost:2000/api/mailTemplates/`, {
        data: {
          mailTemplateId: mailTemplateId,
        },
      })
      .then((response) => {
        dispatch(deleteMailTemplateSuccess(response.status));
        dispatch(fetchMailTemplatesStartAsync({ pageSize: 1, limitSize: 10 }));
      })
      .catch((error) => {
        dispatch(deleteMailTemplateFailure(error.message));
      });
  };
};
