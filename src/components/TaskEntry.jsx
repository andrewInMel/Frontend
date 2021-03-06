import { Typography, Grid } from "@material-ui/core";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Option from "./OptionMenu";
import LinearProgress from "@material-ui/core/LinearProgress";
import { myConnections } from "./pages/Dashboard.jsx";

const useStyles = makeStyles((theme) => ({
  myWidth: {
    minWidth: "900px",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#DAE7E0",
  },
  myBar: {
    borderRadius: 5,
    backgroundColor: (progress) => (progress !== 100 ? "#478562" : "#C91C00"),
  },
  progressPosition: {
    paddingBottom: "10px",
  },
}));

export default function TaskEntry({ task }) {
  const oneTask = task;
  /* priority img path */
  const path = `/priority/${oneTask.priority}.svg`;
  /* calculate progress */
  const startTime = new Date(oneTask.startDate).getTime();
  const dueTime = new Date(oneTask.endDate).getTime();
  const currentTime = new Date().getTime();
  const percentage = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  const progress = () => {
    if (startTime > currentTime || task.endDate === "") {
      return 0;
    }

    if (percentage < 100) {
      return percentage;
    } else {
      return 100;
    }
  };
  /* variable required at runtime */

  const classes = useStyles(progress());

  const [optionOpen, setOptionOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClose = () => {
    setOptionOpen(false);
  };

  const handleOpen = () => {
    setOptionOpen(true);
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.myWidth}
    >
      {/* fisrt column */}
      <Grid
        item
        container
        direction="column"
        xs={4}
        style={{ paddingLeft: "10%" }}
        onClick={() => {
          handleOpen();
          setIsEdit(false);
        }}
      >
        {/* task name */}
        <Grid item>
          <Typography>{oneTask.taskName}</Typography>
        </Grid>
        {/* member photos */}
        <Grid item>
          <AvatarGroup max={5}>
            {oneTask.members.map((connectionId) => {
              const person = myConnections.find(
                (onePerson) => onePerson._id === connectionId
              );
              return person == null ? null : (
                <Avatar
                  key={person._id}
                  alt={person.firstName}
                  src={person.imageSrc}
                  className={classes.small}
                  sizes={classes.small}
                />
              );
            })}
          </AvatarGroup>
        </Grid>
      </Grid>
      {/* 2nd column, priority & icon */}
      <Grid item xs={3}>
        <Icon>
          <img src={path} alt="priority" />
        </Icon>
      </Grid>
      {/* progress */}
      <Grid
        container
        item
        direction="column"
        className={classes.progressPosition}
        xs={3}
      >
        <Grid item container direction="row" justifyContent="flex-end">
          <Grid item>{oneTask.endDate}</Grid>
        </Grid>
        <Grid item>
          <LinearProgress
            variant="determinate"
            value={progress()}
            classes={{
              root: classes.root,
              bar: classes.myBar,
              colorPrimary: classes.colorPrimary,
            }}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="flex-start">
          <Grid item>{oneTask.startDate}</Grid>
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item xs={2} style={{ paddingLeft: "5%" }}>
        <Option
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          setOptionOpen={setOptionOpen}
          optionOpen={optionOpen}
          onClose={handleClose}
          selected={oneTask}
          type="task"
        />
      </Grid>
    </Grid>
  );
}
