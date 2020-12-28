import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
    forgottenPasswordContainer: {
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
export default function ForgottenPassword() {
    const [formData, setFormData] = useState({
        email: "",
      });
      const isFormEmpty = !Object.values(formData).every(
        (x) => x !== null && x !== ""
      );
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const classes = useStyles();

  const {email} = formData
   const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  async function resetUsersPassword(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div className={classes.forgottenPasswordContainer}>
      <Card>
        <CardContent>
          <h2>Password Reset</h2>
          {error && <Alert severity="danger">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <hr/>
          <form onSubmit={(e) => resetUsersPassword(e)}>
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
            <CardActions>
            <Button
              disabled={isFormEmpty || loading}
              variant="contained"
              fullWidth={true}
              color="primary"
              type="submit"
            >
              Reset Password
            </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <div className={classes.logInSection}>
          Go To
            <Link to="/signin"> Login</Link>
        </div>
    </div>
  )
}