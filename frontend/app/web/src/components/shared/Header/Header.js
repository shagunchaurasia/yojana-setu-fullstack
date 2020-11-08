import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleSideMenu } from "./../../../redux/sideMenu/sideMenu.action";
import { selectSideToggleValue } from "./../../../redux/sideMenu/sideMenu.selector";

const Header = (props) => {
  const generateIcon = (iconName) => {
    console.log("icon name is " + iconName);
  };
  const drawerWidth = props.drawerWidth;
  const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    console.log("clicked");
    console.log(props);
    props.toggleSideMenu();
    setOpen(props.selectSideToggleValue);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const redirectToLink = (link) => {
    // alert(link);
    //  to={`/adminPanel/${data.link}`}
    props.history.push("/adminPanel/" + link);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#001d6d" }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ color: "white" }}>
            Yojana Setu Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.values([
            { text: "Schemes", link: "masterSchemes", icon: "list" },
            {
              text: "Scheme Types",
              link: "masterSchemeTypes",
              icon: "view_list_outlined",
            },
          ]).map((data, index) => (
            <span onClick={() => redirectToLink(data.link)}>
              <ListItem button key={data.text}>
                <ListItemIcon>
                  <Icon>{data.icon} </Icon>
                </ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItem>
            </span>
          ))}
        </List>
        <Divider />
        <List>
          {Object.values([
            { text: "Users", link: "masterUser", icon: "people_sharp" },
            { text: "States", link: "state", icon: "place_rounded" },
            { text: "Cities", link: "masterCities", icon: "place_two_tone" },
          ]).map((data, index) => (
            <span onClick={() => redirectToLink(data.link)}>
              <ListItem button key={data.text}>
                <ListItemIcon>
                  <Icon>{data.icon} </Icon>
                </ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItem>
            </span>
          ))}
        </List>
        <Divider />

        <List>
          {Object.values([
            {
              text: "Mail Templates",
              link: "masterMailTemplates",
              icon: "contact_mail_two_tone",
            },
            { text: "Mail History", link: "masterMails", icon: "all_inbox" },
            { text: "Send Mail", link: "alternate_email", icon: "send" },
          ]).map((data, index) => (
            <span onClick={() => redirectToLink(data.link)}>
              <ListItem button key={data.text}>
                <ListItemIcon>
                  <Icon>{data.icon} </Icon>
                </ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItem>
            </span>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectSideToggleValue: selectSideToggleValue,
});
const mapDispatchToProps = (dispatch) => ({
  toggleSideMenu: () => dispatch(toggleSideMenu()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
