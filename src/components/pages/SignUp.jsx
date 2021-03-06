import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MyTextField from "../MyTextField";
import { extStyles } from "../Style.js";
import theme from "../Theme.js";
import { serverURL } from "./SignIn.jsx";

const intStyles = {
  fieldSpace: {
    paddingTop: "2.5vh",
  },
  centreContainer: {
    position: "absolute",
    top: "15vh",
  },
  space: {
    paddingTop: "2vh",
  },
};
const combinedStyles = { ...intStyles, ...extStyles };

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      signedUp: false,
      match: true,
    };
  }
  /* handlers */
  firstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };
  lastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };
  confirmPasswordHandler = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    if (
      this.state.confirmPassword === this.state.password &&
      this.state.password !== ""
    ) {
      this.setState({ match: true });
      Axios.post(`${serverURL}/api/users/register`, this.state)
        .then(() => {
          alert("User created");
          this.setState({ signedUp: true });
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.email);
          } else {
            alert("Sorry, something went wrong. Please try again.");
          }
        });
    } else {
      alert("Something is wrong with your password.");
      this.setState({ match: false });
    }
  };

  render() {
    const { classes } = this.props;

    const { firstName, lastName, email, password, confirmPassword, signedUp } =
      this.state;
    if (signedUp) {
      return <Redirect to="/Signin" />;
    }
    return (
      <div className={classes.backgroundLanding}>
        <Container maxWidth={false} className={classes.centreContainer}>
          <Typography
            variant="h2"
            align="center"
            style={{ paddingBottom: "3vh" }}
          >
            Start Connecting
          </Typography>
          {/* sign up form */}

          <form onSubmit={this.submitHandler}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* name */}
              <Grid
                container
                item
                className={classes.fieldSpace}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ width: "25vw" }}
              >
                <Grid item className={classes.fieldSpace}>
                  <MyTextField
                    myWidth="12vw"
                    label="Firstname"
                    name="firstname"
                    fieldValue={firstName}
                    handler={this.firstNameHandler}
                  />
                </Grid>
                <Grid item className={classes.fieldSpace}>
                  <MyTextField
                    myWidth="12vw"
                    label="Lastname"
                    name="lastname"
                    fieldVaule={lastName}
                    handler={this.lastNameHandler}
                  />
                </Grid>
              </Grid>
              {/* Email */}
              <Grid item className={classes.fieldSpace}>
                <MyTextField
                  myWidth="25vw"
                  label="Email"
                  fieldValue={email}
                  name="email"
                  type="email"
                  handler={this.emailHandler}
                />
              </Grid>
              {/* password */}
              <Grid item className={classes.fieldSpace}>
                <MyTextField
                  myWidth="25vw"
                  label="Password"
                  fieldValue={password}
                  name="password"
                  type="password"
                  handler={this.passwordHandler}
                />
              </Grid>
              {/* confirm password */}
              <Grid item className={classes.fieldSpace}>
                <MyTextField
                  myWidth="25vw"
                  label="Confirm Password"
                  fieldValue={confirmPassword}
                  name="Confirm Password"
                  type="password"
                  handler={this.confirmPasswordHandler}
                />
              </Grid>
              {/* password warning */}
              {this.state.match ? null : (
                <Grid item style={{ width: "25vw" }}>
                  <Typography variant="caption" color="error">
                    Password does not match
                  </Typography>
                </Grid>
              )}
              {/* check box */}
              <Grid item style={{ width: "25vw" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: theme.palette.steelForms.main }}
                    />
                  }
                  label={
                    <Typography variant="caption">
                      Accept Terms and Conditions
                    </Typography>
                  }
                />
              </Grid>

              {/* submit */}
              <Grid item className={classes.space}>
                <Button
                  className={classes.btnLandingLogIn}
                  style={{ width: "25vw" }}
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          {/* link to sign in page */}
          <Typography
            align="center"
            variant="caption"
            display="block"
            className={classes.space}
            component={Link}
            to="/Signin"
          >
            Already have an account
          </Typography>
        </Container>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(combinedStyles)(SignUp);
