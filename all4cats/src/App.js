import logoLightSmall from './assets/logo_transparent_light_small.png';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import Price from "./components/Price";
import SearchHouse from "./components/SearchHouse";
import Prediction from "./components/Prediction";
import User from "./components/User";
import UserProvider from "./providers/UserProvider";
import { auth, provider } from './firebase.js'

import CA from "./components/States/CA";
import FL from "./components/States/FL";
import GA from "./components/States/GA";
import IL from "./components/States/IL";
import MI from "./components/States/MI";
import NC from "./components/States/NC";
import NY from "./components/States/NY";
import NJ from "./components/States/NJ";
import OH from "./components/States/OH";
import PA from "./components/States/PA";
import TX from "./components/States/TX";

import AK from "./components/Morestates/AK";
import AL from "./components/Morestates/AL";
import AR from "./components/Morestates/AR";
import AZ from "./components/Morestates/AZ";
import CO from "./components/Morestates/CO";
import CT from "./components/Morestates/CT";
import DC from "./components/Morestates/DC";
import DE from "./components/Morestates/DE";
import HI from "./components/Morestates/HI";
import IA from "./components/Morestates/IA";
import ID from "./components/Morestates/ID";
import IN from "./components/Morestates/IN";
import KS from "./components/Morestates/KS";
import KY from "./components/Morestates/KY";
import LA from "./components/Morestates/LA";
import MA from "./components/Morestates/MA";
import MD from "./components/Morestates/MD";
import ME from "./components/Morestates/ME";
import MN from "./components/Morestates/MN";
import MO from "./components/Morestates/MO";
import MS from "./components/Morestates/MS";
import MT from "./components/Morestates/MT";
import MV from "./components/Morestates/MV";
import MY from "./components/Morestates/MY";
import ND from "./components/Morestates/ND";
import NE from "./components/Morestates/NE";
import NH from "./components/Morestates/NH";
import NM from "./components/Morestates/NM";
import NV from "./components/Morestates/NV";
import OK from "./components/Morestates/OK";
import OR from "./components/Morestates/OR";
import RI from "./components/Morestates/RI";
import SC from "./components/Morestates/SC";
import SD from "./components/Morestates/SD";
import TN from "./components/Morestates/TN";
import UT from "./components/Morestates/UT";
import VA from "./components/Morestates/VA";
import VT from "./components/Morestates/VT";
import WA from "./components/Morestates/WA";
import WI from "./components/Morestates/WI";







const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  demo2: {
    flexGrow: 1,
  },
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'grey',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  });

  return (
    <div className="App">
      <UserProvider>
        <div className={classes.root}>
          <AppBar position="static" style={{background: '#1C4954'}}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} onClick={(event, newValue) => { setValue(0) }} color="inherit" aria-label="menu" to='/' component={Link}>
                <img src={logoLightSmall} alt='Logo' height='60'/>
              </IconButton>
              <div className={classes.demo2}>
                <StyledTabs value={value !== "login" ? value : false} onChange={handleChange} aria-label="styled tabs navbar">
                  <StyledTab label="Price" to='/price' component={Link}/>
                  <StyledTab label="Search House" to='/searchhouse' component={Link}/>
                  <StyledTab label="Prediction" to='/prediction' component={Link}/>
                </StyledTabs>
                <Typography className={classes.padding} />
              </div>
              <Box>
                <Button color="inherit" onClick={(event, newValue) => { setValue("login") }} component={Link} to="/user">{user == null ? "Login" : "My Profile"} </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Switch>
            <Route exact path={["/", "/price"]} component={Price} />
            <Route path="/searchhouse" component={SearchHouse} />
            <Route path="/prediction" component={Prediction} />
            <Route path="/user" component={User} />
            <Route path="/states/CA" component={CA} />
            <Route path="/states/FL" component={FL} />
            <Route path="/states/GA" component={GA} />
            <Route path="/states/IL" component={IL} />
            <Route path="/states/MI" component={MI} />
            <Route path="/states/NC" component={NC} />
            <Route path="/states/NJ" component={NJ} />
            <Route path="/states/NY" component={NY} />
            <Route path="/states/OH" component={OH} />
            <Route path="/states/PA" component={PA} />
            <Route path="/states/TX" component={TX} />
            <Route path="/states/AK" component={AK} />
            <Route path="/states/AL" component={AL} />
            <Route path="/states/AR" component={AR} />
            <Route path="/states/AZ" component={AZ} />
            <Route path="/states/CO" component={CO} />
            <Route path="/states/CT" component={CT} />
            <Route path="/states/DC" component={DC} />
            <Route path="/states/DE" component={DE} />
            <Route path="/states/HI" component={HI} />
            <Route path="/states/IA" component={IA} />
            <Route path="/states/ID" component={ID} />
            <Route path="/states/IN" component={IN} />
            <Route path="/states/KS" component={KS} />
            <Route path="/states/KY" component={KY} />
            <Route path="/states/LA" component={LA} />
            <Route path="/states/MA" component={MA} />
            <Route path="/states/MD" component={MD} />
            <Route path="/states/ME" component={ME} />
            <Route path="/states/MN" component={MN} />
            <Route path="/states/MO" component={MO} />
            <Route path="/states/MS" component={MS} />
            <Route path="/states/MT" component={MT} />
            <Route path="/states/MV" component={MV} />
            <Route path="/states/MY" component={MY} />
            <Route path="/states/ND" component={ND} />
            <Route path="/states/NE" component={NE} />
            <Route path="/states/NH" component={NH} />
            <Route path="/states/NM" component={NM} />
            <Route path="/states/NV" component={NV} />
            <Route path="/states/OK" component={OK} />
            <Route path="/states/OR" component={OR} />
            <Route path="/states/RI" component={RI} />
            <Route path="/states/SC" component={SC} />
            <Route path="/states/SD" component={SD} />
            <Route path="/states/TN" component={TN} />
            <Route path="/states/UT" component={UT} />
            <Route path="/states/VA" component={VA} />
            <Route path="/states/VT" component={VT} />
            <Route path="/states/WA" component={WA} />
            <Route path="/states/WI" component={WI} />  
          </Switch>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
