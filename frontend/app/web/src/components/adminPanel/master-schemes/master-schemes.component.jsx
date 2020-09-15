import React from "react";
import CustomizedTable from "../../shared/customizedTable/customizedTable.component";

const MasterSchemesComponent = (props) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <a href={text}>{text === 1 ? "Active" : "Inactive"}</a>,
    },
    {
      title: "Scheme Name",
      dataIndex: "schemeName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Scheme Type",
      dataIndex: "schemeType",
    },
    {
      title: "Average Rating",
      dataIndex: "averageRating",
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
    },
    {
      title: "Modified On",
      dataIndex: "modifiedOn",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
  ];
  return (
    <div>
      <CustomizedTable
        columnsPassed={columns}
        dataPassed={props.data}
        hasData={props.data ? true : false}
      ></CustomizedTable>
    </div>
  );
};

export default MasterSchemesComponent;
