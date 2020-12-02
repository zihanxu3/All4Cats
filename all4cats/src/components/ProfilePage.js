import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth, addFavoriteLayoutAndType } from "../firebase";
import {makeStyles} from '@material-ui/core/styles';
import { Button, Typography, Card, TextField, InputAdornment, OutlinedInput } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
      paddingTop: "100px",
      display: 'flex',
      // flexDirection: "column",
      justifyContent: "center",
  },
  card: {
    display: 'flex',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const ProfilePage = () => {
  const user = useContext(UserContext);
  const {displayName, email} = user;
  const classes = useStyles();
  const [bedrooms, setBedrooms] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');

  const [lowerPrice, setLowerPrice] = React.useState('');
  const [upperPrice, setUpperPrice] = React.useState('');

  console.log(displayName);
  console.log(email);


  const onChangeSaveBedrooms = (event) => {
    setBedrooms(event.target.value);
  };

  const onChangeSaveBathrooms = (event) => {
    setBathrooms(event.target.value);
  };

  const onChangeSaveLowerPrice = (event) => {
    setLowerPrice(event.target.value);
  };

  const onChangeSaveUpperPrice = (event) => {
    setUpperPrice(event.target.value);
  };

  async function onClickSavePreferences(user, bed, bath, lower, upper) {
    try {
      await addFavoriteLayoutAndType(user, bed, bath, lower, upper);
    } catch (error) {
      console.error("Error adding favorites", error);
    }
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <div style={{width:"320px"}}>
        <Card variant="outlined">
            <div style={{display: 'flex', flexDirection: "column", justifyContent:"flex-start"}}>
            <h2>
              My Profile
            </h2>
            <Typography>
              Display Name: {displayName}
            </Typography>
            <Typography>
              Email: {email}
            </Typography>
            </div>
            <Button variant="contained" color="secondary" style={{marginTop:"1rem", marginBottom:"0.5rem"}} onClick = {() => {auth.signOut()}}>
              Sign Out
            </Button>
        </Card>
        <Card style={{marginTop: "2rem"}} variant="outlined">
            <h2>
              My Preference
            </h2>

            <div style={{display: user.favoriteLayout == null ? "inline" : "none"}}>
              <Typography>
                Favorite Layout: 
              </Typography>
              <div style={{margin: "2px 15px", display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <TextField margin='dense' size="small" style={{width: "40px"}} value={bedrooms} onChange={onChangeSaveBedrooms} variant="outlined">
                </TextField>
                <Typography>
                  Bedrooms
                </Typography>
                <TextField margin='dense' size="small" style={{width: "40px"}} value={bathrooms} onChange={onChangeSaveBathrooms} variant="outlined"></TextField>
                <Typography>
                  Bathrooms
                </Typography>
              </div>

              <Typography style={{marginTop: "20px", marginBottom: "10px"}}>
                Favorite Price Range: 
              </Typography>
              <div style={{margin: "2px 15px", display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <Typography>
                  Lower
                </Typography>
                <OutlinedInput startAdornment={<InputAdornment position="start">$</InputAdornment>} margin='dense' size="small" style={{width: "90px"}} value={lowerPrice} onChange={onChangeSaveLowerPrice} variant="outlined"></OutlinedInput>
                <Typography>
                  Upper
                </Typography>
                <OutlinedInput startAdornment={<InputAdornment position="start">$</InputAdornment>} margin='dense' size="small" style={{width: "90px"}} value={upperPrice} onChange={onChangeSaveUpperPrice} variant="outlined"></OutlinedInput>
              </div>

              <Button variant="contained" color="primary" style={{margin: "15px 0px"}} onClick={() => onClickSavePreferences(user, bedrooms, bathrooms, lowerPrice, upperPrice)}>
                Save Preferences
              </Button>
            </div>

            <div style={{display: user.favoriteLayout == null ? "none" : "inline"}}>
              <h5 style={{fontSize:"1rem"}}>
                Favorite Layout: 
              </h5>
              <Typography>
                {user.favoriteLayout && user.favoriteLayout.bedrooms} Bedrooms { user.favoriteLayout && user.favoriteLayout.bathrooms} Bathrooms
              </Typography>
              <h5 style={{fontSize:"1rem"}}>
                Favorite Price Range: 
              </h5>
              <Typography style={{marginBottom: "20px"}}>
                Lower: {user.favoritePrice && user.favoritePrice.lowerPrice} ~ Upper: { user.favoritePrice && user.favoritePrice.upperPrice}
              </Typography>
            </div>
        </Card>

        <Card style={{marginTop: "2rem"}} variant="outlined">
            <div style={{display: 'flex', flexDirection: "column", justifyContent:"flex-start"}}>
            <h2>
              My Favorite Houses
            </h2>
            </div>
        </Card>
      </div>
    </div>
  ) 
};
export default ProfilePage;
