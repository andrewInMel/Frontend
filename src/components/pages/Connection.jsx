import React, { useState, useRef, useEffect } from "react";
import ConnectionEntry from "../ConnectionEntry";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  headerStyle: {
    backgroundColor: "#afc1c9",
    height: "50px",
    padding: "20px 33px 0 20px",
  },
  changeColor: {
    backgroundColor: "#DEE2E3",
  },
}));

function Connection(props) {
  const classes = useStyles();
  const [myWidth, setMyWidth] = useState(null);
  const ref = useRef(null);

  function delay(callback, ms) {
    var timer = 0;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  function handleResize() {
    if (ref.current) {
      setMyWidth(ref.current.offsetWidth);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", delay(handleResize, 500));
    return () => {
      window.removeEventListener("resize", delay);
    };
  }, []);

  return (
    <Paper ref={ref} elevation={3}>
      <ListHeader myClasses={classes} />
      <FixedSizeList
        height={window.innerHeight * 0.7}
        width={myWidth}
        itemSize={75}
        itemCount={props.connectionList.length}
        itemData={{
          myStyle: classes.changeColor,
          dataList: props.connectionList,
          otherData: true,
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
}

function renderRow({ data, index, style }) {
  return (
    <ListItem
      style={style}
      key={data.dataList == null ? 0 : data.dataList[index]._id}
      classes={{
        root: index % 2 === 0 ? null : data.myStyle,
      }}
    >
      <ConnectionEntry connection={data.dataList[index]} />
    </ListItem>
  );
}

const ListHeader = (props) => {
  return (
    <div className={props.myClasses.headerStyle}>
      <Grid container direction="row">
        {/* name */}
        <Grid item xs={2} style={{ paddingLeft: "3%" }}>
          <Typography> Connection </Typography>
        </Grid>
        {/* title */}
        <Grid item xs={2}></Grid>
        {/* company */}
        <Grid item xs={3}>
          <Typography> COMPANY </Typography>
        </Grid>
        {/* Phone */}
        <Grid item xs={2} style={{ paddingLeft: "1%" }}>
          <Typography> PHONE </Typography>
        </Grid>
        {/* TASK */}
        <Grid item xs={1}>
          {/* <Typography> TASK </Typography> */}
        </Grid>
        {/* vip */}
        <Grid item xs={1} style={{ paddingLeft: "1.5%" }}>
          <Typography> VIP </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Connection;
