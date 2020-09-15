import React from "react";
import { Table } from "antd";

const CustomizedTable = (props) => {
  console.log("Props");
  console.log(props);
  return (
    <Table
      {...props}
      // pagination={{ position: [props.top, props.bottom] }}
      columns={props.columnsPassed}
      dataSource={props.hasData ? props.dataPassed : null}
      scroll={props.scrollPassed}
    />
  );
};

export default CustomizedTable;
