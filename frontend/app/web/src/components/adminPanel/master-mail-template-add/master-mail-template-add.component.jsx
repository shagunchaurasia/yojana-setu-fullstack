import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { Formik, isPromise, useFormik } from "formik";
import axios from "axios";
import { connect } from "react-redux";
import CustomizedButton from "../../shared/customizedForm/customizedButton/customizedButton.component";
import CustomizedInput from "../../shared/customizedForm/customizedInput/customizedInput.component";
import {
  updateMailTemplateBody,
  fetchMailTemplateStartAsync,
} from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import {
  selectMailTemplateBody,
  // selectMailTemplatesFromDB,
  fetchMailTemplateDetails,
} from "../../../redux/masterMailTemplates/masterMailTemplates.selector";
import {
  selectModalDetails,
  selectModalDisplay,
} from "../../../redux/globalModal/globalModal.selector";
import {
  showModal,
  hideModal,
} from "../../../redux/globalModal/globalModal.action";
import {
  showSnackbar,
  hideSnackbar,
} from "../../../redux/globalSnackbar/globalSnackbar.action";
import { selectSnackBarDetails } from "../../../redux/globalSnackbar/globalSnackbar.selector";

const MasterMailTemplateAddForm = (props) => {
  console.log("props.initialValues");
  console.log(props);
  // console.log("props inside mastermailtemplate add");
  // console.log(props);
  // let initialValues = {};
  // if (props.match.url.includes("edit")) {
  //   console.log("Editing will be done for this form");
  //   props.fetchMailTemplateStartAsync("5f64a57cc2698d01695041df");

  //   console.log(props.fetchMailTemplateDetails);

  //   axios
  //     .get("http://localhost:2000/api/mailTemplates/5f64a57cc2698d01695041df")
  //     .then((response) => {
  //       console.log("Response from api");
  //       console.log(response);
  //       initialValues = response.data.data[0];
  //       console.log(initialValues);
  //     });
  // }
  // return2(
  //   <Formik
  //     // initialValues={props.initialValues}
  //     onSubmit={(values, { setSubmitting }) => {
  //       console.log(values);
  //       props.onSubmit(values);
  //       // setTimeout(() => {
  //       //   alert(JSON.stringify(values, null, 2));
  //       //   setSubmitting(false);
  //       //   const mailTemplateBody = {
  //       //     templateName: values.templateName,
  //       //     mailTo: values.mailTo,
  //       //     mailCC: values.mailCC,
  //       //     mailBCC: values.BCC,
  //       //     // attachment: values.,
  //       //     addedDate: new Date(),
  //       //     subject: values.subject,
  //       //     mailBody: values.mailBody,
  //       //     status: 1,
  //       //     // signature: values.,
  //       //   };
  //       //   axios
  //       //     .post("http://localhost:2000/api/mailTemplates", mailTemplateBody)
  //       //     .then((response) => {
  //       //       console.log(response);
  //       //       if (response.data.status == true) {
  //       //         let modalDetails = {
  //       //           modalType: "info",
  //       //           modalProps: {
  //       //             open: true,
  //       //           },
  //       //         };
  //       //         props.showModal(modalDetails);
  //       //         let snackBarDetails = {
  //       //           snackType: "Success",
  //       //           snackProps: {
  //       //             open: true,
  //       //           },
  //       //         };
  //       //         props.showSnackbar(snackBarDetails);
  //       //         // props.history.goBack();
  //       //       } else {
  //       //         alert("error");
  //       //         let modalDetails = {
  //       //           modalType: "error",
  //       //           modalProps: {
  //       //             open: true,
  //       //           },
  //       //         };
  //       //         props.showModal(modalDetails);
  //       //       }
  //       //     })
  //       //     .catch((error) => {
  //       //       let modalDetails = {
  //       //         modalType: "error",
  //       //         modalProps: {
  //       //           open: true,
  //       //         },
  //       //       };
  //       //       props.showModal(modalDetails);
  //       //     });
  //       // }, 400);
  //     }}
  //   >
  //     {({
  //       values,
  //       errors,
  //       touched,
  //       handleChange,
  //       handleBlur,
  //       handleSubmit,
  //       isSubmitting,
  //       /* and other goodies */
  //     }) => (
  //       <form
  //         onSubmit={props.onSubmit(values)}
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           justifyContent: "space-between",
  //           padding: "10px",
  //         }}
  //         showModalPassed={showModal}
  //       >
  //         <CustomizedInput
  //           type="text"
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           value={props.values.templateName}
  //           label="Template Name"
  //           name="templateName"
  //         />
  //         <CustomizedInput
  //           type="text"
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           value={props.values.mailTo}
  //           name="mailTo"
  //           label="Mail To"
  //         />
  //         <CustomizedInput
  //           type="text"
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           value={props.values.mailCC}
  //           name="mailCC"
  //           label="Mail CC"
  //         />
  //         <CustomizedInput
  //           type="text"
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           value={props.values.mailBCC}
  //           name="mailBCC"
  //           label="Mail BCC"
  //         />
  //         <CustomizedInput
  //           type="text"
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           value={props.values.subject}
  //           name="subject"
  //           label="Subject"
  //         />
  //         <div style={{ marginTop: "20px" }}>
  //           <CKEditor
  //             name="htmlBody"
  //             editor={ClassicEditor}
  //             data="<p>Hello from CKEditor 5!</p>"
  //             onInit={(editor) => {
  //               console.log("Editor is ready to use!", editor);
  //             }}
  //             onChange={(event, editor) => {
  //               const data = editor.getData();
  //               console.log({ event, editor, data });
  //               props.updateMailTemplateBody(data);
  //             }}
  //             onBlur={(event, editor) => {
  //               console.log("Blur.", editor);
  //             }}
  //             onFocus={(event, editor) => {
  //               console.log("Focus.", editor);
  //             }}
  //           />
  //         </div>
  //         <div style={{ textAlign: "center" }}>
  //           <CustomizedButton
  //             type="submit"
  //             style={{
  //               backgroundColor: "#ff008b",
  //               width: "200px",
  //               marginTop: "20px",
  //             }}
  //           >
  //             Save
  //           </CustomizedButton>
  //           <CustomizedButton
  //             type="button"
  //             onClickHandler={() => props.goBack()}
  //             style={{
  //               backgroundColor: "#ff008b",
  //               width: "200px",
  //               marginTop: "20px",
  //             }}
  //           >
  //             Cancel
  //           </CustomizedButton>
  //         </div>
  //       </form>
  //     )}
  //   </Formik>
  // );

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      props.onSubmit(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
      }}
      showModalPassed={showModal}
    >
      <CustomizedInput
        type="text"
        //onChange={handleChange}
        //onBlur={handleBlur}
        onChange={formik.handleChange}
        value={props.values.templateName}
        label="Template Name"
        name="templateName"
      />
      <CustomizedInput
        type="text"
        onChange={formik.handleChange}
        //onBlur={handleBlur}
        value={props.values.mailTo}
        name="mailTo"
        label="Mail To"
      />
      <CustomizedInput
        type="text"
        onChange={formik.handleChange}
        //onBlur={handleBlur}
        value={props.values.mailCC}
        name="mailCC"
        label="Mail CC"
      />
      <CustomizedInput
        type="text"
        onChange={formik.handleChange}
        //onBlur={handleBlur}
        value={props.values.mailBCC}
        name="mailBCC"
        label="Mail BCC"
      />
      <CustomizedInput
        type="text"
        onChange={formik.handleChange}
        //onBlur={handleBlur}
        value={props.values.subject}
        name="subject"
        label="Subject"
      />
      <div style={{ marginTop: "20px" }}>
        <CKEditor
          name="htmlBody"
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            props.updateMailTemplateBody(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <CustomizedButton
          type="submit"
          style={{
            backgroundColor: "#ff008b",
            width: "200px",
            marginTop: "20px",
          }}
        >
          Save
        </CustomizedButton>
        <CustomizedButton
          type="button"
          onClickHandler={() => props.goBack()}
          style={{
            backgroundColor: "#ff008b",
            width: "200px",
            marginTop: "20px",
          }}
        >
          Cancel
        </CustomizedButton>
      </div>
    </form>
  );
};

// const mapStateToProps = createStructuredSelector({
//   selectMailTemplateBody: selectMailTemplateBody,
//   modalDetails: selectModalDetails,
//   selectModalDisplay: selectModalDisplay,
//   selectSnackBarDetails: selectSnackBarDetails,
//   // selectMailTemplatesFromDB: selectMailTemplatesFromDB,
//   fetchMailTemplateDetails: fetchMailTemplateDetails,
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateMailTemplateBody: (mailTemplateBody) =>
//     dispatch(updateMailTemplateBody(mailTemplateBody)),
//   fetchMailTemplateStartAsync: (mailTemplateId) =>
//     dispatch(fetchMailTemplateStartAsync({ mailTemplateId })),
//   hideModal: () => dispatch(hideModal()),
//   showModal: (modalDetails) => dispatch(showModal(modalDetails)),
//   showSnackbar: () => dispatch(showSnackbar()),
//   hideSnackbar: () => dispatch(hideSnackbar()),
// });
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(MasterMailTemplateAddForm)
// );

export default MasterMailTemplateAddForm;
