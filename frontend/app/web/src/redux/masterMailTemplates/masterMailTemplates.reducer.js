import MailTemplatesActionTypes from "./masterMailTemplates.type";

const INITIAL_STATE = {
  isFetching: false,
  mailTemplates: {},
  mailTemplateBody: "",
  errorMessage: undefined,
  mailTemplate: {},
  mailTemplateDetailFetching: false,
  isDeleting: false,
};

const mailTemplateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MailTemplatesActionTypes.UPDATE_MAIL_TEMPLATE_BODY:
      return {
        ...state,
        mailTemplateBody: action.payload,
      };
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_START:
      return {
        ...state,
        isFetching: true,
      };
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        mailTemplates: action.payload,
        isFetching: false,
      };
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_START:
      return {
        ...state,
        mailTemplateDetailFetching: true,
      };
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_SUCCESS:
      console.log("FETCH_MAIL_TEMPLATE_SUCCESS");
      return {
        ...state,
        mailTemplate: action.payload.data[0],
        mailTemplateDetailFetching: false,
      };
    case MailTemplatesActionTypes.FETCH_MAIL_TEMPLATE_FAILURE: {
      return {
        ...state,
        mailTemplateDetailFetching: false,
        errorMessage: action.payload,
      };
    }
    case MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_START: {
      console.log("INSIDE REDUCERA");
      return {
        ...state,
        isDeleting: true,
      };
    }
    case MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
      };
    }
    case MailTemplatesActionTypes.DELETE_MAIL_TEMPLATE_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        isDeleting: false,
      };
    }

    default:
      return state;
  }
};

export default mailTemplateReducer;
