import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Avatar, Typography, Switch } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Button from "@material-ui/core/Button";
import AddSocialMedia from "../AddSocialMedia.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { serverURL } from "./SignIn.jsx";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  formGapStyle: {
    paddingBottom: "10px",
  },
  cursorStyle: {
    cursor: "pointer",
  },
  solidLine: {
    borderTop: `3px solid #bbb`,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    margin: "-1px 0 0 0",
  },
  rootStyle: {
    width: "960px",
    padding: "20px 30px 0 50px",
    backgroundColor: "#f7faf9",
    minHeight: "584px",
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  buttonStyle: {
    padding: "5px",
  },
  iconStyle: {
    marginRight: "10px",
  },
  sectionGap: {
    paddingBottom: "50px",
  },
  btnColor: {
    backgroundColor: "#478562",
    "&:hover": {
      backgroundColor: "#478562",
    },
  },
  inputStyle: {
    backgroundColor: "#f7f7f7",
    width: "229px",
  },
  btnClass: {
    backgroundColor: "#4F7E83;",
    margin: "10px 0 10px 260px",
    width: "90px",
    paddingLeft: "0",
    paddingRight: "0",
    "&:hover": {
      backgroundColor: "#4F7E83",
    },
  },
  midSection: {
    padding: " 50px 0 0 100px",
  },
  textBox: {
    width: "350px",
  },
  notePadding: {
    paddingLeft: "0",
    paddingRight: "0",
  },
}));

function AddConnection(props) {
  const classes = useStyles();
  /* left section state */
  const [userPhoto, setUserPhoto] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [vip, setVip] = useState(false);
  /* social media */
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  /* about states */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [birthday, setBirthday] = useState("");
  const [lastName, setLastName] = useState("");
  /* notes states */
  const [noteList, setNoteList] = useState([]);
  const [noteText, setNoteText] = useState("");
  /* helper states */
  const [photoSrc, setPhotoSrc] = useState("");
  const [linkOpen, setLinkOpen] = useState([false, false, false, false]);
  const [option, setOption] = useState(true);
  const myRef = useRef(null);
  /* tags */
  const [chosenTags, setChosenTags] = useState([]);
  const tags = JSON.parse(localStorage.getItem("tags"));

  /* handle about */
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleAddr = (event) => {
    setAddr(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleCompany = (event) => {
    setCompany(event.target.value);
  };
  const handleBirthday = (event) => {
    setBirthday(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  /* handle note */
  const handleNoteText = (event) => {
    setNoteText(event.target.value);
  };
  const handleDeleteNote = (oneNote) => () => {
    setNoteList(noteList.filter((oneMember) => oneMember !== oneNote));
  };

  const handleSubmitNote = () => {
    if (noteText !== "") {
      let today = new Date().toISOString().split("T")[0];
      const data = { note: noteText, date: today };
      setNoteList(noteList.concat(data));
      setNoteText("");
    }
  };

  /* dialog to set social media link */
  const handleLinkClose = () => {
    setLinkOpen([false, false, false, false]);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleOccupation = (event) => {
    setOccupation(event.target.value);
  };

  const handleVip = () => {
    setVip(!vip);
  };

  const handleAbout = () => {
    setOption(true);
  };

  const handleNotes = () => {
    setOption(false);
  };
  /* File upload operation */
  const handleFileSelect = (event) => {
    if (event.target.files[0] != null) {
      setUserPhoto(event.target.files[0]);
    }
  };
  /* image preview */
  useEffect(() => {
    if (userPhoto !== null) {
      setPhotoSrc(URL.createObjectURL(userPhoto));
    }
  }, [userPhoto]);

  /* submit connection detail */
  const submitConnection = () => {
    const newTags = chosenTags.filter((oneTag) => !tags.includes(oneTag));
    localStorage.setItem("tags", JSON.stringify([...tags, ...newTags]));
    if (name !== "") {
      if (userPhoto !== null) {
        const fd = new FormData();
        fd.append("file", userPhoto);
        fd.append("upload_preset", "myUpload");
        axios
          .post(
            `https://api.cloudinary.com/v1_1/andrewstorage/image/upload`,
            fd
          )
          .then((res) => {
            updateDetail(res.data.secure_url);
          })
          .catch((error) => {
            console.log(error);
            alert("Photo upload failed.");
          });
      } else {
        updateDetail("");
      }
      props.onClose();
    } else {
      alert("First name must be provided.");
    }
  };

  function updateDetail(myImageSrc) {
    axios
      .post(
        `${serverURL}/api/connections/create`,
        {
          firstName: name,
          lastName: lastName,
          email: email,
          phoneNumber: phone,
          address: addr,
          company: company,
          occupation: occupation,
          birthday: birthday,
          vip: vip,
          imageSrc: myImageSrc,
          notes: noteList,
          tags: chosenTags,
          github: github,
          instagram: instagram,
          linkedIn: linkedIn,
          twitter: twitter,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        resetAll();
        alert("Connection created successfully.");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Create connection failed.");
      });
  }

  const resetAll = () => {
    setName("");
    setLastName("");
    setUserPhoto(null);
    setOccupation("");
    setVip(false);
    setTwitter("");
    setInstagram("");
    setGithub("");
    setLinkedIn("");
    setEmail("");
    setAddr("");
    setPhone("");
    setCompany("");
    setBirthday("");
    setNoteList([]);
    setNoteText("");
    setPhotoSrc(null);
    setLinkOpen([false, false, false, false]);
    setOption(true);
    setChosenTags([]);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className={classes.rootStyle}>
        <Grid container direction="row">
          {/* left section */}
          <Grid
            item
            container
            direction="column"
            justifyContent="space-around"
            xs={4}
          >
            {/* top seciton */}
            <Grid item container direction="row" alignItems="center">
              {/* photo */}
              <Grid item xs={6}>
                <Avatar
                  alt="user photo"
                  src={photoSrc}
                  className={`${classes.large} ${classes.cursorStyle}`}
                  onClick={() => myRef.current.click()}
                >
                  <Typography align="center">Upload Your Image</Typography>
                </Avatar>
                <input
                  type="file"
                  ref={myRef}
                  onChange={handleFileSelect}
                  hidden
                />
              </Grid>
              {/* name and VIP switch */}
              <Grid item container direction="column" xs={6}>
                <Grid item>
                  <TextField
                    value={name + " " + lastName}
                    onChange={handleName}
                    InputProps={{ disableUnderline: true }}
                    placeholder="New Contact"
                  />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">VIP</Typography>
                  </Grid>
                  <Switch checked={vip} onChange={handleVip} />
                </Grid>
              </Grid>
            </Grid>
            {/* middle section */}
            <Grid
              item
              container
              direction="column"
              className={`${classes.sectionGap}`}
            >
              {/* twitter */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <TwitterIcon fontSize="small" />
                </Grid>

                <Grid item>
                  {twitter === "" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([true, false, false, false]);
                      }}
                      style={{ height: "25px" }}
                    >
                      Add Twitter Link
                    </Button>
                  ) : (
                    <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
                  )}
                </Grid>
              </Grid>
              {/* instagram */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <InstagramIcon fontSize="small" />
                </Grid>

                <Grid item>
                  {instagram === "" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, true, false, false]);
                      }}
                      style={{ height: "25px" }}
                    >
                      Add Instagram Link
                    </Button>
                  ) : (
                    <a href={`https://www.instagram.com/${instagram}/`}>
                      {instagram}
                    </a>
                  )}
                </Grid>
              </Grid>
              {/* github */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <GitHubIcon fontSize="small" />
                </Grid>

                <Grid item>
                  {github === "" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, false, true, false]);
                      }}
                      style={{ height: "25px" }}
                    >
                      Add Github Link
                    </Button>
                  ) : (
                    <a href={`https://github.com/${github}`}>{github}</a>
                  )}
                </Grid>
              </Grid>
              {/* linkedIn */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <LinkedInIcon fontSize="small" />
                </Grid>
                <Grid item>
                  {linkedIn === "" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, false, false, true]);
                      }}
                      style={{ height: "25px" }}
                    >
                      Add LinkedIn Link
                    </Button>
                  ) : (
                    <a href={`https://www.linkedin.com/in/${linkedIn}/`}>
                      {linkedIn}
                    </a>
                  )}
                </Grid>
              </Grid>
              {/* reset links */}
              <Grid item style={{ paddingTop: "15px" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{ height: "25px" }}
                  onClick={() => {
                    setTwitter("");
                    setInstagram("");
                    setGithub("");
                    setLinkedIn("");
                  }}
                >
                  Reset Links
                </Button>
              </Grid>
              {/* customise tags */}
              <Grid item style={{ paddingTop: "30px" }}>
                <Typography variant="subtitle1" gutterBottom={true}>
                  Choose or Customize Tag
                </Typography>
                <Autocomplete
                  style={{ width: "230px" }}
                  freeSolo
                  multiple
                  id="tags"
                  options={tags}
                  getOptionLabel={(tag) => tag}
                  value={chosenTags}
                  size="small"
                  onChange={(event, value) => {
                    if (event != null) {
                      setChosenTags(value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </Grid>
              <AddSocialMedia
                open={linkOpen[0]}
                onClose={handleLinkClose}
                setLink={setTwitter}
              />
              <AddSocialMedia
                open={linkOpen[1]}
                onClose={handleLinkClose}
                setLink={setInstagram}
              />
              <AddSocialMedia
                open={linkOpen[2]}
                onClose={handleLinkClose}
                setLink={setGithub}
              />
              <AddSocialMedia
                open={linkOpen[3]}
                onClose={handleLinkClose}
                setLink={setLinkedIn}
              />
            </Grid>
            {/* bottom section */}
            <Grid item>
              <Button
                classes={{ root: classes.btnColor }}
                variant="contained"
                onClick={submitConnection}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* middle section */}
          <Grid
            item
            container
            direction="column"
            xs={7}
            className={classes.midSection}
          >
            {/* top secton */}
            <Grid item container direction="row">
              {/* about */}
              <Grid item xs={10}>
                <Typography
                  variant="h6"
                  className={classes.cursorStyle}
                  onClick={handleAbout}
                  style={
                    option
                      ? {
                          width: "65px",
                          borderBottom: "6px solid #478562",
                        }
                      : null
                  }
                >
                  About
                </Typography>
              </Grid>
              {/* Notes */}
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.cursorStyle}
                  onClick={handleNotes}
                  style={
                    option
                      ? null
                      : {
                          width: "59px",
                          borderBottom: "6px solid #478562",
                        }
                  }
                >
                  Notes
                </Typography>
              </Grid>
            </Grid>
            {/* divider line */}
            <Grid item style={{ width: "403.5px" }}>
              <hr className={classes.solidLine} />
            </Grid>
            {/* bottom section */}
            {option ? (
              /* about component */
              <Grid
                item
                container
                direction="column"
                style={{ paddingTop: "50px" }}
              >
                {/* name */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> First Name*</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      value={name}
                      onChange={handleName}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Last Name</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      value={lastName}
                      onChange={handleLastName}
                    />
                  </Grid>
                </Grid>
                {/* occupation */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Occupation</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      value={occupation}
                      onChange={handleOccupation}
                    />
                  </Grid>
                </Grid>
                {/* email */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Email</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      type="email"
                      value={email}
                      onChange={handleEmail}
                    />
                  </Grid>
                </Grid>
                {/* Address */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Address </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      value={addr}
                      onChange={handleAddr}
                    />
                  </Grid>
                </Grid>
                {/* phone */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Phone </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      type="tel"
                      value={phone}
                      onChange={handlePhone}
                    />
                  </Grid>
                </Grid>
                {/* company */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Company </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      value={company}
                      onChange={handleCompany}
                    />
                  </Grid>
                </Grid>
                {/* birthday */}
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.formGapStyle}
                >
                  <Grid item xs={4}>
                    <Typography> Birthday </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      classes={{ root: classes.inputStyle }}
                      type="date"
                      value={birthday}
                      onChange={handleBirthday}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              /* notes component */
              <Grid
                item
                container
                direction="column"
                style={{ paddingLeft: "30px" }}
              >
                <Typography
                  style={{ padding: "30px 0 10px 0", fontWeight: "600" }}
                >
                  Add note
                </Typography>
                <TextField
                  variant="outlined"
                  minRows={2}
                  multiline
                  className={classes.textBox}
                  value={noteText}
                  onChange={handleNoteText}
                />
                <Button
                  variant="contained"
                  classes={{ contained: classes.btnClass }}
                  onClick={handleSubmitNote}
                >
                  SAVE
                </Button>

                {noteList === [] ? null : (
                  <List>
                    {noteList.map((oneNote) => {
                      return (
                        <ListItem
                          classes={{ root: classes.notePadding }}
                          key={`${oneNote.note.slice(0, 8)}${Math.floor(
                            Math.random() * 1000000
                          )}`}
                        >
                          <NoteField
                            nodeValue={oneNote}
                            update={setNoteList}
                            onDelete={handleDeleteNote(oneNote)}
                            list={noteList}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Grid>
            )}
          </Grid>
          {/* right section */}
          <Grid item xs={1} style={{ paddingLeft: "40px" }}>
            <CloseIcon
              onClick={() => {
                resetAll();
                props.onClose();
              }}
              fontSize="large"
            />
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

export default AddConnection;

const NoteField = ({ nodeValue, onDelete, update, list }) => {
  const [text, setText] = useState(nodeValue.note);

  const handleDelte = () => {
    onDelete();
  };

  const updateNote = (event) => {
    setText(event.target.value);
  };

  const hanldeUpdate = () => {
    let today = new Date().toISOString().split("T")[0];
    const data = { note: text, date: today };
    const newList = list
      .concat(data)
      .filter((oneMember) => oneMember !== nodeValue);
    update(newList);
  };
  return (
    <Grid container direction="row">
      {/* text area */}
      <TextField
        value={text}
        variant="outlined"
        multiline
        onChange={updateNote}
        style={{ width: "350px" }}
      />
      {/* date, then delete & edit functionality */}
      <Grid container direction="row">
        <Grid item xs={5} style={{ paddingLeft: "5px" }}>
          <Typography variant="caption">{nodeValue.date}</Typography>
        </Grid>
        <Button
          variant="text"
          onClick={handleDelte}
          style={{ padding: "0", marginLeft: "20px" }}
        >
          <Typography variant="caption"> Delete </Typography>
        </Button>
        <Button variant="text" onClick={hanldeUpdate} style={{ padding: "0" }}>
          <Typography variant="caption"> save change</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
