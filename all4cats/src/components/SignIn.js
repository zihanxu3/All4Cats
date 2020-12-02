import React, {useState} from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { List,
        ListItem, 
        TextField,
        Button,
        Typography,
    } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {signInWithGoogle} from '../firebase'
import {auth} from '../firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center"
    },
    textField: {
        marginButtom: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '30ch',
    },
    buttonStyle: {
        margin: "auto",
        width: '30ch',
        marginButtom: theme.spacing(1.5),
        marginTop: theme.spacing(1.5),
    },
    titleText: {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: theme.spacing(5),
    },
    linkStyle: {
        textDecoration: 'none',
        color: blue[600],
    }

}));

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
                auth.signInWithEmailAndPassword(email, password).catch(error => {
                  setError("Error signing in with password and email!");
                  console.error("Error signing in with password and email", error);
                });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name == 'userEmail') {
            setEmail(value);
        }
        else if(name == 'userPassword'){
            setPassword(value);
        }
    };
        
    const classes = useStyles();

    return (
        <div style={{display:"flex", justifyContent: "center", marginTop: "7rem"}} >
            <div className={classes.root}>
                <Typography className={classes.titleText}>
                    Sign In
                </Typography>
                <TextField className={classes.textField} label='Email' name='userEmail' variant="outlined" value = {email} onChange={onChangeHandler}>

                </TextField>
            
                <TextField className={classes.textField} label='Password' name='userPassword' variant="outlined" value = {password} onChange={onChangeHandler}>

                </TextField>
                <div style={{height: "1rem"}}>
                </div>
                <Button className={classes.buttonStyle} variant="outlined" color="primary" onClick={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Sign In with Email
                </Button>
                <Button className={classes.buttonStyle} variant="outlined" color="secondary" onClick={signInWithGoogle}>
                    Sign In with Google
                </Button>
                <p>
                    Don't have an account?{" "}
                    <Link to="/user/signUp" className={classes.linkStyle}>
                        Sign up here
                    </Link>
                    {" "}
                    <br />
                    {" "}
                    <Link to="/user/passwordReset" className={classes.linkStyle}>
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignIn;
