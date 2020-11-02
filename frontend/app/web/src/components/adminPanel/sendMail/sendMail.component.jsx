import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik, Field, Form } from "formik";
import { updateMailBody } from "./../../../redux/masterSendMail/masterSendMail.action";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { connect } from "react-redux";
import axios from "axios";
import "./sendMail.style.scss";
import { selectMailBody } from "./../../../redux/masterSendMail/masterSendMail.selector";
import { createStructuredSelector } from "reselect";
import CustomizedInput from "./../../shared/customizedForm/customizedInput/customizedInput.component";
import CustomizedButton from "./../../shared/customizedForm/customizedButton/customizedButton.component";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const MasterSendMailComponent = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("onfill");
    console.log(values.mailBody);

    // console.log(textInput.props);

    return false;
    const sendOptions = {
      mailTo: values.mailTo,
      mailBCC: values.mailBCC,
      mailCC: values.mailCC,
      mailBody: values.mailBody,
      subject: values.subject,
    };
    axios
      .post("http://localhost:2000/api/mail", sendOptions)
      .then(function (response) {
        console.log(response);
      });
  };

  const onReset = () => {
    console.log("on reset");
  };
  return (
    <div>
      <Formik
        initialValues={{
          mailTo: "",
          mailCC: "",
          mailBCC: "",
          subject: "",
          htmlBody: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(props.selectMailBody);
          alert(JSON.stringify(values, null, 2));

          const sendOptions = {
            mailTo: values.mailTo,
            mailBCC: values.mailBCC,
            mailCC: values.mailCC,
            mailBody: props.selectMailBody,
            subject: values.subject,
          };
          axios
            .post("http://localhost:2000/api/mail", sendOptions)
            .then(function (response) {
              console.log(response);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CustomizedInput
              label="Mail To"
              id="mailTo"
              name="mailTo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mailTo}
              required="true"
            ></CustomizedInput>

            <CustomizedInput
              label="Mail CC"
              id="mailCC"
              name="mailCC"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mailCC}
            ></CustomizedInput>

            <CustomizedInput
              label="Mail BCC"
              id="mailBCC"
              name="mailBCC"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mailBCC}
            ></CustomizedInput>
            <CustomizedInput
              label="Subject"
              id="subject"
              name="subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
            ></CustomizedInput>
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
                  props.updateMailBody(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <ButtonGroup
                variant="contained"
                color="primary"
                size="small"
                aria-label="small outlined button group"
              >
                <CustomizedButton type="submit">Send</CustomizedButton>
                <CustomizedButton>Reset</CustomizedButton>
              </ButtonGroup>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateMailBody: (mailBody) => dispatch(updateMailBody(mailBody)),
});

const mapStateToProps = createStructuredSelector({
  selectMailBody: selectMailBody,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterSendMailComponent);
