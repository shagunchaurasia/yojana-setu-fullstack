import MasterSchemeTypes from "./components/adminPanel/master-scheme-types/master-scheme-types.container";
import MasterSchemes from "./components/adminPanel/master-schemes/master-schemes.container";
import MasterCities from "./components/adminPanel/master-cities/master-cities.container";

import React, { Component } from "react";
import "./app.css";
import Toolbar from "@material-ui/core/Toolbar";
import Header from "./components/shared/Header/Header";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Layout } from "antd";
import SideMenu from "./components/adminPanel/side-menu/side-menu.component";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import MasterMailTemplates from "./components/adminPanel/master-mail-templates/master-mail-templates.container";
import MasterMail from "./components/adminPanel/master-mail/master-mail.container";
import MasterSendMail from "./components/adminPanel/sendMail/sendMail.container";
import MasterMailDetailView from "./components/adminPanel/master-mail-detail/master-mail-detail.container";
// const { Header, Content, Footer, Sider } = Layout;
import { showModal, hideModal } from "./redux/globalModal/globalModal.action";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Footer from "./components/shared/Footer/Footer.component";
import MasterMailTemplateAdd from "./components/adminPanel/master-mail-template-add/master-mail-template-add.container";
import { selectModalDetails } from "./redux/globalModal/globalModal.selector";
import { createStructuredSelector } from "reselect";
import GlobalModal from "./components/shared/globalModal/globalModal.component";
import GlobalSnackbar from "./components/shared/globalSnackbar/globalSnackbar.component";

// class AppAdmin extends Component {
//   state = {
//     collapsed: false,
//   };

//   onCollapse = (collapsed) => {
//     console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   render() {
//     return (
//       <div className="app">
//         <Layout>
//           <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
//             <div className="logo">ADMIN PANEL</div>
//           </Header>
//           <Sider
//             collapsible
//             collapsed={this.state.collapsed}
//             onCollapse={this.onCollapse}
//             style={{
//               overflow: "auto",
//               height: "100vh",
//               position: "fixed",
//               left: 0,
//               paddingTop: "20px",
//             }}
//           >
//             <SideMenu></SideMenu>
//           </Sider>
//           <Layout className="site-layout" style={{ marginLeft: 200 }}>
//             <Header className="site-layout-background" style={{ padding: 0 }} />
//             <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
//               <div
//                 className="site-layout-background"
//                 style={{ padding: 24, textAlign: "center" }}
//               >
//                 <Switch>
//                   <Route
//                     exact
//                     path="/adminPanel/masterSchemes"
//                     component={MasterSchemes}
//                   />
//                   <Route
//                     exact
//                     path="/adminPanel/masterCities"
//                     component={MasterCities}
//                   />
//                   <Route
//                     exact
//                     path="/adminPanel/masterSchemeTypes"
//                     component={MasterSchemeTypes}
//                   />
//                   <Route
//                     exact
//                     path="/signIn-Register"
//                     render={() =>
//                       this.props.currentUser ? (
//                         <Redirect to="/" />
//                       ) : (
//                         <MasterSchemes />
//                       )
//                     }
//                   />
//                 </Switch>
//               </div>
//             </Content>
//             <Footer style={{ textAlign: "center" }}>
//               Yojana Setu @ {new Date().getFullYear()}
//             </Footer>
//           </Layout>
//         </Layout>
//       </div>
//     );
//   }
// }

// export default AppAdmin;
const drawerWidth = 260;

class AppAdmin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  render() {
    return (
      <div>
        <Header drawerWidth="250"></Header>

        <Container
          style={{ padding: "50px", paddingTop: "100px", maxHeight: "300px" }}
        >
          <Switch>
            <Route
              exact
              path="/adminPanel/masterMailTemplates"
              component={MasterMailTemplates}
            />
            <Route
              exact
              path="/adminPanel/masterMails"
              component={MasterMail}
            />
            <Route
              exact
              path="/adminPanel/masterSendMail"
              component={MasterSendMail}
            />
            <Route
              exact
              path="/signIn-Register"
              render={() =>
                this.props.currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <MasterMailTemplates />
                )
              }
            />
            <Route
              path="/adminPanel/mailDetail/:id"
              children={<MasterMailDetailView />}
            />
            <Route
              exact
              path="/adminPanel/masterSchemes"
              component={MasterSchemes}
            />
            <Route
              exact
              path="/adminPanel/masterCities"
              component={MasterCities}
            />
            <Route
              exact
              path="/adminPanel/masterSchemeTypes"
              component={MasterSchemeTypes}
            />
            <Route
              path="/adminPanel/masterMailTemplates/edit/:id"
              children={<MasterMailTemplateAdd />}
            />
            <Route
              path="/adminPanel/masterMailTemplates/add"
              children={<MasterMailTemplateAdd />}
            />
          </Switch>
          {/* <Footer></Footer> */}
          <GlobalModal></GlobalModal>
          <GlobalSnackbar></GlobalSnackbar>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  modalDetails: selectModalDetails,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppAdmin);
