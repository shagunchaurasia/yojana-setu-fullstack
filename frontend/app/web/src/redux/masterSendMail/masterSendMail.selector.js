import { createSelector } from "reselect";

const selectSendMail = (state) => state.sendMail;

export const selectMailBody = createSelector([selectSendMail], (mail) => {
  return mail.mailBody;
});
