import MailActionTypes from "./masterMail.type";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: undefined,
  mails: null,
  isMailDetailFetching: false,
  mailDetail: null,
};

const mailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MailActionTypes.FETCH_MAILS_START:
      return {
        ...state,
        isFetching: true,
      };
    case MailActionTypes.FETCH_MAILS_SUCCESS:
      return {
        ...state,
        mails: action.payload.data,
        isFetching: false,
      };

    case MailActionTypes.FETCH_MAILS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }

    case MailActionTypes.FETCH_MAIL_DETAIL_START: {
      return {
        ...state,
        isMailDetailFetching: true,
      };
    }

    case MailActionTypes.FETCH_MAIL_DETAIL_SUCCESS: {
      return {
        ...state,
        mailDetail: action.payload.data,
        isMailDetailFetching: false,
      };
    }

    case MailActionTypes.FETCH_MAIL_DETAIL_FAILURE: {
      return {
        ...state,
        isMailDetailFetching: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default mailReducer;
