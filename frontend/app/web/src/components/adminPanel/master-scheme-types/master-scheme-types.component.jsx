import React from "react";
import CustomizedTable from "../../shared/customizedTable/customizedTable.component";

const MasterSchemeTypesComponent = (props) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => <a href={text}>{text === 1 ? "Active" : "Inactive"}</a>,
    },
    {
      title: "Related Image",
      dataIndex: "relatedImage",
      render: (text) => (
        <img src={text} style={{ height: "50px", width: "50px" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Common Name",
      dataIndex: "commonName",
    },
    {
      title: "Alternate Name",
      dataIndex: "alternateName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Detailed Description",
      dataIndex: "detailedDescription",
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
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

export default MasterSchemeTypesComponent;
