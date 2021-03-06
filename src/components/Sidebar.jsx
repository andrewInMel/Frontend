import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Axios from "axios";
import { serverURL } from "./pages/SignIn.jsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#DEE2E3",
    minHeight: "100vh",
  },
  topStyle: {
    margin: "48px 84px 48px 41px",
  },
  middleStyle: {
    flexGrow: "1",
    padding: (matches) => (matches ? "0 0 0 50px" : "0"),
  },
  bottomStyle: {
    height: "80px",
    backgroundColor: "#E2DCDC",
  },
  imgStyle: {
    width: "100%",
    display: "block",
    margin: "auto",
  },
  text: {
    fontWeight: 600,
    textDecoration: "none",
    fontSize: (matches) => (matches ? "20px" : "15px"),
    color: "#4F7E83",
  },
  iconStyle: {
    margin: "0 5px",
  },
  colorStyle: {
    color: "#834F69",
  },
  defaultIconStyle: {
    color: "#4F7E83;",
  },
});

function Sidebar(props) {
  const matches = useMediaQuery("(min-width:1000px)");
  const [clicked, setClicked] = useState(
    JSON.parse(sessionStorage.getItem("navStatus"))
  );
  const classes = useStyles(matches);

  const handleSignOut = () => {
    Axios.get(`${serverURL}/auth/logout`, { withCredentials: true })
      .then(() => {
        props.setStatus(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid
      container
      item
      xs={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      className={classes.root}
    >
      {/* Logo */}
      <Grid item className={classes.topStyle}>
        <a
          href="/Dashboard"
          onClick={() => {
            setClicked([true, false, false]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([true, false, false])
            );
          }}
        >
          <img src={logo} className={classes.imgStyle} alt="Logo"></img>
        </a>
      </Grid>
      {/* Navigation */}
      <Grid
        container
        item
        direction="column"
        justifyContent="space-evenly"
        className={classes.middleStyle}
      >
        {/* dashboard link */}
        <Grid
          container
          item
          onClick={() => {
            setClicked([true, false, false]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([true, false, false])
            );
          }}
          direction="row"
          alignItems="center"
        >
          <AssessmentIcon
            classes={
              clicked[0]
                ? { root: classes.colorStyle }
                : { root: classes.defaultIconStyle }
            }
            className={classes.iconStyle}
          />
          <Typography
            className={
              clicked[0]
                ? `${classes.text} ${classes.colorStyle}`
                : classes.text
            }
            component={Link}
            to={`${props.linkPath}`}
          >
            Dashboard
          </Typography>
        </Grid>
        {/* Connection link */}
        <Grid
          container
          item
          onClick={() => {
            setClicked([false, true, false]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([false, true, false])
            );
          }}
          direction="row"
          alignItems="center"
          style={{ paddingLeft: "1px" }}
        >
          <RecentActorsIcon
            classes={
              clicked[1]
                ? { root: classes.colorStyle }
                : { root: classes.defaultIconStyle }
            }
            className={classes.iconStyle}
          />
          <Typography
            className={
              clicked[1]
                ? `${classes.text} ${classes.colorStyle}`
                : classes.text
            }
            component={Link}
            to={`${props.linkPath}/connection`}

            //   onClick={() => {props.setCustomPath("connection")}}
          >
            Connection
          </Typography>
        </Grid>
        {/* Task link */}
        <Grid
          container
          item
          onClick={() => {
            setClicked([false, false, true]);
            sessionStorage.setItem(
              "navStatus",
              JSON.stringify([false, false, true])
            );
          }}
          direction="row"
          alignItems="center"
        >
          <ListAltIcon
            classes={
              clicked[2]
                ? { root: classes.colorStyle }
                : { root: classes.defaultIconStyle }
            }
            className={classes.iconStyle}
          />
          <Typography
            className={
              clicked[2]
                ? `${classes.text} ${classes.colorStyle}`
                : classes.text
            }
            component={Link}
            to={`${props.linkPath}/task`}
            //onClick={() => {props.setCustomPath("task")}}
          >
            Task
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ flexGrow: "2" }} />
      {/* Settings & Sign out */}
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.bottomStyle}
      >
        <Grid item>
          <Typography
            className={classes.text}
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          >
            Sign out
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
