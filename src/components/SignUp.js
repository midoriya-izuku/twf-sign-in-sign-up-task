import React, { useEffect, useState, useRef, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  signUpContainer: {
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
  logInSection: {
    marginTop: "1.5em",
  },
}));
const SignUp = () => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const [loading, setLoading] = useState(false)

  const isInitialMount = useRef(true); //when the component is initially mounted set useRef to true

  useEffect(() => {
    if (isInitialMount.current) {
      //set the component as mounted
      isInitialMount.current = false;
    } else {
      validate();
    }
  }, [formData]); //as soon as form Input changes validate the input

  const history = useHistory();
  
  const { signup } = useAuth();

  const [signUpError, setSignUpError] = useState();

  const { email, password, rePassword } = formData;

  const validate = () => {
    let errors = { password: "", rePassword: "", email: "" };
    
    if (password.length > 0 && password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    } else {
      errors.password = "";
    }
    if (
      password.length > 0 &&
      rePassword.length > 0 &&
      password !== rePassword
    ) {
      errors.rePassword = "Passwords do not match";
    } else {
      errors.rePassword = "";
    }
    setFormErrors(errors);
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signup(email, password);
      history.push("/")
    } catch (err) {
      setSignUpError("Unable to create an account");
    }
    setLoading(false)
  };

  const isValidated = !Object.values(formErrors).some(
    (x) => x !== null && x !== ""
  );

  const isFormEmpty = !Object.values(formData).every(
    (x) => x !== null && x !== ""
  );

  const classes = useStyles();
  return (
    <Fragment>
      {signUpError && <Alert severity="error">{signUpError}</Alert>}
      <div className={classes.signUpContainer}>
        <p className={classes.formTitle}>Create Account</p>
        <hr />
        <form onSubmit={(e) => signUpUser(e)}>
          <TextField
            type="email"
            fullWidth={true}
            error={formErrors.email.length > 0 ? true : false}
            className={classes.formInput}
            id="email"
            required
            name="email"
            label="Email"
            variant="outlined"
            onChange={(e) => onInputChange(e)}
            value={email}
            helperText={formErrors.email}
            autoComplete="email"
          />
          <TextField
            type="password"
            fullWidth={true}
            error={formErrors.password.length > 0 ? true : false}
            className={classes.formInput}
            required
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={(e) => onInputChange(e)}
            value={password}
            helperText={formErrors.password}
            autoComplete="new-password"
          />
          <TextField
            type="password"
            fullWidth={true}
            error={formErrors.rePassword.length > 0 ? true : false}
            className={classes.formInput}
            required
            id="rePassword"
            name="rePassword"
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => onInputChange(e)}
            value={rePassword}
            helperText={formErrors.rePassword}
            autoComplete="off"
          />
          <Button
            disabled={isFormEmpty || !isValidated || loading}
            variant="contained"
            fullWidth={true}
            color="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <div className={classes.logInSection}>
          Already have an account?
          <Link to="/signin"> Sign In</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
