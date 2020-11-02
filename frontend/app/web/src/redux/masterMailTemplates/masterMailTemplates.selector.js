import { createSelector } from "reselect";

const selectMasterMailTemplates = (state) => state.mailTemplates;

const selectMasterMailTemplateBody = (state) => state.mailTemplateBody;

export const selectMailTemplatesFromDB = createSelector(
  [selectMasterMailTemplates],
  (mailTemplate) => {
    console.log("Inside mailtemplates from db");
    console.log(mailTemplate);
    return mailTemplate.mailTemplates;
  }
);

export const selectMailTemplateBody = createSelector(
  [selectMasterMailTemplateBody],
  (mailTemplateBody) => {
    return mailTemplateBody;
  }
);

export const selectIsMailTemplateFetching = createSelector(
  [selectMailTemplatesFromDB],
  (mailTemplateSelect) => {
    console.log("mailTemplateSelect");
    console.log(mailTemplateSelect);
    return mailTemplateSelect.isFetching;
  }
);

export const fetchMailTemplateDetails = createSelector(
  [selectMasterMailTemplates],
  (mailTemplateSelect) => {
    console.log("Here inside fetchMail template details");
    return mailTemplateSelect.mailTemplate;
  }
);

export const selectIsMailTemplateDetailFetching = createSelector(
  [selectMasterMailTemplates],
  (mailTemplateSelect) => {
    console.log("Here inside select");
    console.log(mailTemplateSelect);
    return mailTemplateSelect.mailTemplateDetailFetching;
  }
);
