import React from "react";
import { withRouter } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import CustomizedButton from "../../shared/customizedForm/customizedButton/customizedButton.component";
import CustomizedTable from "../../shared/customizedTable/customizedTable.component";

const MasterMailTemplatesComponent = (props) => {
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
            columns={props.columns}
            fetchData={fetchData}
            loading={props.isLoading}
            pageCount={props.mailTemplates.totalPages}
            totalData={props.mailTemplates.count}
          ></CustomizedTable>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(MasterMailTemplatesComponent);
