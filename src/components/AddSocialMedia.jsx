import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Grid, IconButton, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function AddSocialMedia(props) {
  const [onelink, setOneLink] = useState("");

  const handleOneLink = (event) => {
    setOneLink(event.target.value);
  };
  const addLink = () => {
    props.setLink(onelink);
    props.onClose();
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ padding: "10px 0 10px 10px" }}
      >
        <Grid>
          <TextField
            id="Link"
            label="Please Enter Username"
            variant="outlined"
            onChange={handleOneLink}
            value={onelink}
          />
        </Grid>
        <Grid>
          <IconButton onClick={addLink}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddSocialMedia;
