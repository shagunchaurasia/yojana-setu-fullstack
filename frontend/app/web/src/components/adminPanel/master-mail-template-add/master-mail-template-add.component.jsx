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
  showModal,
  hideModal,
} from "../../../redux/globalModal/globalModal.action";

const MasterMailTemplateAddForm = (props) => {
  console.log("props.initialValues");
  console.log(props);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
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
          data={props.editProp == "edit" ? props.values.mailBody : ""}
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

export default MasterMailTemplateAddForm;
