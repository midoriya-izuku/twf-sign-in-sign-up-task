import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgottenPassword from "./components/ForgottenPassword";
import Dashboard from "./components/Dashboard";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff4400",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
function App() {
  return (
    <Container>
      <Box minHeight="100vh">
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/forgot-password" component={ForgottenPassword} />
              </Switch>
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </Box>
    </Container>
  );
}

export default App;
