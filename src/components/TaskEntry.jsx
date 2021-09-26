import { Typography, Grid, Avatar } from "@material-ui/core";
import React from "react";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Option from "./OptionMenu";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

/* customized liner progress */
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#1a90ff",
  },
}));

export default function TaskEntry(props) {
  const oneTask = props.task;
  const classes = useStyles();
  /* img path */
  const path = `/imgs/priority/${oneTask.priority}.svg`;
  /* calculate progress */
  const startTime = new Date(oneTask.start).getTime();
  const dueTime = new Date(oneTask.due).getTime();
  const currentTime = new Date().getTime();
  const percentage = Math.round(
    (100 * (currentTime - startTime)) / (dueTime - startTime)
  );
  const progress = percentage < 100 ? percentage : 100;

  return (
    <Grid container direction="row" alignItems="center">
      {/* fisrt column */}
      <Grid
        item
        container
        direction="column"
        xs={5}
        style={{ paddingLeft: "15%" }}
      >
        {/* task name */}
        <Grid item>
          <Typography>{oneTask.taskName}</Typography>
        </Grid>
        {/* member photos */}
        <Grid item>
          <AvatarGroup max={5}>
            {oneTask.memberPhoto.map((person) => (
              <Avatar
                key={person.id}
                alt={person.name}
                src={person.photoSource}
                className={classes.small}
              />
            ))}
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
      <Grid container item direction="column" xs={2}>
        <Grid item container direction="row" justifyContent="space-between">
          <Grid item>{oneTask.start}</Grid>
          <Grid item>{oneTask.due}</Grid>
        </Grid>
        <Grid item>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
      </Grid>
      {/* actions */}
      <Grid item xs={2} style={{ paddingLeft: "5%" }}>
        <Option id={oneTask.taskId} />
      </Grid>
    </Grid>
  );
}
