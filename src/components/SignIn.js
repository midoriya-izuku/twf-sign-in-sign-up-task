import React, { useState, useRef, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  signInContainer: {
    top: "50vh",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    padding: "1.3em",
    border: "1px solid lightgray",
    borderRadius: "10px",
    width: "40vw",
    minWidth: "300px",
    maxWidth: "450px",
    textAlign: "center",
  },
  formInput: {
    border: "0",
    margin: "0",
    padding: "0",
    position: "relative",
    minWidth: "0",
    verticalAlign: "top",
    display: "block",
    flex: "none",
    color: "black",
    marginBottom: "30px",
  },
  formTitle: {
    fontSize: "1.3em",
  },
  signUpSection: {
    marginTop: "1.5em",
  },
}));
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [signInError, setSignInError] = useState();

  const [loading, setLoading] = useState(false);

  const isFormEmpty = !Object.values(formData).every(
    (x) => x !== null && x !== ""
  );

  const classes = useStyles();

  const history = useHistory();

  const { signin, getUserDetails } = useAuth();

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signInUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signin(email, password);
      history.push("/");
    } catch (err) {
      setSignInError(err.message);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {signInError && <Alert severity="error">{signInError}</Alert>}
      <div className={classes.signInContainer}>
        <p className={classes.formTitle}>Create Account</p>
        <hr />
        <form onSubmit={(e) => signInUser(e)}>
          <TextField
            type="email"
            fullWidth={true}
            className={classes.formInput}
            id="email"
            required
            name="email"
            label="Email"
            variant="outlined"
            onChange={(e) => onInputChange(e)}
            value={email}
            autoComplete="email"
          />
          <TextField
            type="password"
            fullWidth={true}
            className={classes.formInput}
            required
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={(e) => onInputChange(e)}
            value={password}
            autoComplete="new-password"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                disabled={isFormEmpty || loading}
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Grid>
          </Grid>
        </form>
        <div className={classes.signUpSection}>
          Already have an account?
          <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
