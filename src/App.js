import { Fragment } from 'react'
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgottenPassword from './components/ForgottenPassword';
import Dashboard from './components/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
function App() {
  
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <SignIn/>
        <SignUp/>
        <Dashboard/>
        <ForgottenPassword/>
      </ThemeProvider>
    </Fragment>
     
  );
}

export default App;
