import React from "react";
import { withRouter } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import CustomizedButton from "../../shared/customizedForm/customizedButton/customizedButton.component";
import Table from "./newTable.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsMailTemplateFetching,
  selectMailTemplatesFromDB,
} from "../../../redux/masterMailTemplates/masterMailTemplates.selector";
import { connect } from "react-redux";
import {
  fetchMailTemplatesStartAsync,
  updateMailTemplateParams,
} from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import CustomizedTable from "../../shared/customizedTable/customizedTable.component";

const MasterMailTemplatesComponent = (props) => {
  const editMailTemplate = (idSelected) => {
    props.history.push(props.location.pathname + "/edit/" + idSelected);
  };
  const deleteMailTemplate = (idSelected) => {
    console.log(idSelected);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "_id",
        Cell: (props) => (
          <div>
            <CustomizedButton
              onClickHandler={() => editMailTemplate(props.value)}
            >
              Edit
            </CustomizedButton>
            <CustomizedButton
              onClickHandler={() => deleteMailTemplate(props.value)}
            >
              Delete
            </CustomizedButton>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        field: "status",
        Cell: (props) => (
          <div> {props.value == "1" ? "Active" : "Inactive"} </div>
        ),
      },
      {
        Header: "Template Name",
        accessor: "templateName",
        field: "templateName",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Mail To",
        accessor: "mailTo",
      },
      {
        Header: "Mail CC",
        accessor: "mailCC",
      },
      {
        Header: "Mail BCC",
        accessor: "mailBCC",
      },
    ],
    []
  );

  const redirectToAdd = () => {
    props.history.push("/adminPanel/masterMailTemplates/add");
  };

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    props.fetchMailTemplatesStartAsync(pageIndex + 1, pageSize);
  }, []);

  return (
    <div>
      <CustomizedButton
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
        onClickHandler={redirectToAdd}
        style={{ backgroundColor: "#ff008b" }}
      >
        Add Mail Template
      </CustomizedButton>
      <br></br>
      <br></br>
      {props.mailTemplates.data ? (
        <div>
          <CustomizedTable
            data={props.mailTemplates.data}
            columns={columns}
            fetchData={fetchData}
            loading={props.isLoading}
            pageCount={props.mailTemplates.totalPages}
            totalData={props.mailTemplates.count}
          ></CustomizedTable>
        </div>
      ) : (
        "Nothing was found"
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mailTemplates: selectMailTemplatesFromDB,
  isLoading: selectIsMailTemplateFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMailTemplatesStartAsync: (pageSize, limitSize) =>
    dispatch(fetchMailTemplatesStartAsync({ pageSize, limitSize })),
  updateMailTemplateParams: (currentPage) =>
    dispatch(updateMailTemplateParams({ currentPage })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MasterMailTemplatesComponent)
);
