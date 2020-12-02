import React, {useContext} from "react";

import { Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../providers/UserProvider";

function User() {
  const user = useContext(UserContext);
  return (
        user ?
        <ProfilePage />
        :
        <div> 
          <Switch>
              <Route exact path={["/", "/user"]} component={SignIn} />
              <Route exact path="/user/signUp" component={SignUp} />
              <Route exact path="/user/passwordReset" component={PasswordReset} />
          </Switch>
        </div>
  );
}
export default User;