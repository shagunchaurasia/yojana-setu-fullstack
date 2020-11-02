import MailSendActionTypes from "./masterSendMail.type";

export const updateMailBody = (mailBody) => {
  return {
    type: MailSendActionTypes.UPDATE_MAIL_BODY,
    payload: mailBody,
  };
};
