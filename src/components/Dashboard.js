import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
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
}));
const Dashboard = () => {
  const { currentUser, logout, getUserDetails } = useAuth();
  useEffect(() => {
    getUserDetails();
  }, []);
  const [logoutError, setLogoutError] = useState();
  const history = useHistory();
  const classes = useStyles();
  const logoutUser = async () => {
    try {
      await logout();
      history.push("/signin");
    } catch (err) {
      setLogoutError("Something went wrong try again");
    }
  };
  return (
    <div className={classes.dashboardContainer}>
      {logoutError && <Alert severity="error">{logoutError}</Alert>}

      <Card>
        <CardContent>
          Welcome <b>{currentUser.name}</b>. This is your email{" "}
          {currentUser.email}{" "}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={logoutUser}
          >
            Log Out
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Dashboard;
