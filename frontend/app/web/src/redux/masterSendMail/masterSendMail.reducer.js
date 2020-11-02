import MailSendActionTypes from "./masterSendMail.type";

const INITIAL_STATE = {
  mailBody: "",
};

const mailSendReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case MailSendActionTypes.UPDATE_MAIL_BODY:
      return {
        ...state,
        mailBody: action.payload,
      };
    default:
      return state;
  }
};

export default mailSendReducer;
