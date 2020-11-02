import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mailReducer from "./masterMail/masterMail.reducer";
import mailSendReducer from "./masterSendMail/masterSendMail.reducer";
import sideMenuReducer from "./sideMenu/sideMenu.reducer";
import mailTemplateReducer from "./masterMailTemplates/masterMailTemplates.reducer";
import globalModalReducer from "./globalModal/globalModal.reducer";
import globalSnackbarReducer from "./globalSnackbar/globalSnackbar.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["mail", "sendMail", "sideMenuReducer"],
};

const rootReducer = combineReducers({
  mails: mailReducer,
  sendMail: mailSendReducer,
  sideMenu: sideMenuReducer,
  mailTemplates: mailTemplateReducer,
  globalModal: globalModalReducer,
  globalSnackBar: globalSnackbarReducer,
});

export default persistReducer(persistConfig, rootReducer);
