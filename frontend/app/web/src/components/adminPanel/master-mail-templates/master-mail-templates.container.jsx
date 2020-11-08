import React, { Component } from "react";
import MasterMailTemplatesComponent from "./master-mail-templates.component";
import { connect } from "react-redux";
import {
  selectIsMailTemplateFetching,
  selectMailTemplatesFromDB,
} from "../../../redux/masterMailTemplates/masterMailTemplates.selector";
import {
  fetchMailTemplatesStartAsync,
  updateMailTemplateParams,
  deleteMailTemplateAsync,
} from "../../../redux/masterMailTemplates/masterMailTemplates.action";
import { createStructuredSelector } from "reselect";
import {
  SpinnerOverlay,
  SpinnerContainer,
} from "../../shared/withSpinner/withSpinner.style";
import { withRouter } from "react-router-dom";
import CustomizedButton from "../../shared/customizedForm/customizedButton/customizedButton.component";
class MasterMailTemplates extends Component {
  componentDidMount() {
    const { fetchMailTemplatesStartAsync } = this.props;
    fetchMailTemplatesStartAsync(1, 10);
  }

  editMailTemplate = (idSelected) => {
    this.props.history.push(
      this.props.location.pathname + "/edit/" + idSelected
    );
  };
  deleteMailTemplate = (idSelected) => {
    console.log(idSelected);
    this.props.deleteMailTemplateAsync({ mailTemplateId: idSelected });
  };

  columns = [
    {
      Header: "Actions",
      accessor: "_id",
      Cell: (props) => (
        <div>
          <CustomizedButton
            onClickHandler={() => this.editMailTemplate(props.value)}
            buttonType="iconButton"
            iconName="edit"
          >
            Edit
          </CustomizedButton>
          <CustomizedButton
            buttonType="iconButton"
            iconName="delete"
            onClickHandler={() => this.deleteMailTemplate(props.value)}
            style={{ backgroundColor: "#ff008b" }}
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
  ];

  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <MasterMailTemplatesComponent
            mailTemplates={this.props.mailTemplates}
            loading={this.props.isLoading}
            fetchMailTemplatesStartAsync={
              this.props.fetchMailTemplatesStartAsync
            }
            columns={this.columns}
            pageCount={this.props.mailTemplates.totalPages}
            totalData={this.props.mailTemplates.count}
          ></MasterMailTemplatesComponent>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsMailTemplateFetching,
  mailTemplates: selectMailTemplatesFromDB,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMailTemplatesStartAsync: (pageSize, limitSize) =>
    dispatch(fetchMailTemplatesStartAsync({ pageSize, limitSize })),
  updateMailTemplateParams: (currentPage) =>
    dispatch(updateMailTemplateParams({ currentPage })),

  deleteMailTemplateAsync: (mailTemplateId) =>
    dispatch(deleteMailTemplateAsync(mailTemplateId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MasterMailTemplates)
);
