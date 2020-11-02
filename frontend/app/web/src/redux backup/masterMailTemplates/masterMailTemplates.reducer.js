import MailTemplatesActionTypes from "./masterMailTemplates.type";

const INITIAL_STATE = {
  isFetching: false,
  mailTemplates: {
    // searchParams: {},
    // data: [],
    // count: 0,
    // currentPage: 1,
    // limitSize: 10,
    // totalPages: 0,
  },
  mailTemplateBody: "",
  errorMessage: undefined,
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
    case MailTemplatesActionTypes.UPDATE_MAIL_TEMPLATE_PARAMS: {
      return {
        ...state,
        mailTemplates: {
          currentPage: action.payload.currentPage,
        },
      };
    }
    default:
      return state;
  }
};

export default mailTemplateReducer;
