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
