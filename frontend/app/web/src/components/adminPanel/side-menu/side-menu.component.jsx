import React from "react";
import { Menu } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const SideMenu = (props) => {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      inlineCollapsed={true}
      style={{ marginTop: "50px" }}
    >
      <Menu.Item key="12" icon={<PieChartOutlined />}>
        <Link to="/adminPanel/masterSchemes">Schemes</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to="/adminPanel/masterUser">Users</Link>
      </Menu.Item>

      <SubMenu key="sub1" icon={<DesktopOutlined />} title="Masters">
        <Menu.Item key="7">
          <Link to="/adminPanel/masterSchemeTypes">Scheme Types</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/adminPanel/state">States</Link>
        </Menu.Item>
        <Menu.Item key="69">
          <Link to="/adminPanel/masterCities">Cities</Link>
        </Menu.Item>
        <Menu.Item key="67">
          <Link to="/adminPanel/masterSchemeType">User Type</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<MailOutlined />}>
        Mails
      </Menu.Item>
      <SubMenu key="sub3" title="Mail Masters">
        <Menu.Item key="11">Mail Templates</Menu.Item>
        <Menu.Item key="12">Mail Rules</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default SideMenu;
