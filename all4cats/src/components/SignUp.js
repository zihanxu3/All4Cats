import React, {useState} from "react";
import { Link } from "react-router-dom";
import { List,
        ListItem, 
        TextField,
        Button,
        Typography,
    } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {auth, generateUserDocument} from '../firebase'



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

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
            console.log("entered await");
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, displayName);
        }
        catch(error){
            console.log(error);
            setError('Error Signing up with email and password');
        }
    
        setEmail("");
        setPassword("");
        setDisplayName("");
    };
    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name == "userEmail") {
            setEmail(value);
        } else if (name == "userPassword") {
            setPassword(value);
        } else if (name == "displayName") {
            setDisplayName(value);
        }
    };
    
const classes = useStyles();

return (
    <div style={{display:"flex", justifyContent: "center", marginTop: "7rem"}} >
        <div className={classes.root}>
            <Typography className={classes.titleText}>
                Sign Up
            </Typography>
            <TextField className={classes.textField} name='displayName' label='User Name' variant="outlined" value = {displayName} onChange={onChangeHandler}>

            </TextField>

            <TextField className={classes.textField} name='userEmail' label='Email' variant="outlined" value = {email} onChange={onChangeHandler}>

            </TextField>
        
            <TextField className={classes.textField} name='userPassword' label='Password' variant="outlined" value = {password} onChange={onChangeHandler}>

            </TextField>
            <div style={{height: "1rem"}}>
            </div>
            <Button className={classes.buttonStyle} variant="outlined" color="primary" onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>
                Sign Up with Email
            </Button>
            <Button className={classes.buttonStyle} variant="outlined" color="secondary">
                Sign Up with Google
            </Button>
            <p>
                Already have an account?{" "}
                <Link to="/user" className={classes.linkStyle}>
                    Sign in here
                </Link>
            </p>
        </div>
    </div>
  );
};
export default SignUp;
