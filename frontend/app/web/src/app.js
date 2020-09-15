import React, { Component } from "react";
import "./app.css";
// import Header from "./header";
// import { Layout, Menu } from "antd";
// import SideMenu from "./components/adminPanel/side-menu/side-menu.component";
// import { Switch, Route, Redirect } from "react-router-dom";
// import MasterSchemeType from "./components/adminPanel/master-scheme-types/master-scheme-types.component";
// import MasterScheme from "./components/adminPanel/master-schemes/master-schemes.component";
// const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div className="app">
        {/* <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo">USER PANEL</div>
          </Header>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              paddingTop: "20px",
            }}
          >
            <SideMenu></SideMenu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center" }}
              >
                <Switch>
                  <Route exact path="/login" component={MasterScheme} />
                  <Route
                    exact
                    path="/adminPanel/masterScheme"
                    component={MasterScheme}
                  />
                  <Route
                    exact
                    path="/adminPanel/masterSchemeType"
                    component={MasterSchemeType}
                  />
                  <Route
                    exact
                    path="/signIn-Register"
                    render={() =>
                      this.props.currentUser ? (
                        <Redirect to="/" />
                      ) : (
                        <MasterScheme />
                      )
                    }
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Yojana Setu @ {new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout> */}
      </div>
    );
  }
}

export default App;
