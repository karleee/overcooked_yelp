import React from "react";

import { AuthRoute } from "../util/route_util";
import LoginForm from "./session/LoginForm";
import RegisterForm from "./session/RegisterForm";
import SessionButton from "./session/SessionButton";

const App = () => {
  return (
    <div>
      <header>
        <h1>Temporary Homepage!</h1>
        <SessionButton />
      </header>
      <main>
        <AuthRoute path="/login" component={LoginForm} routeType="auth" />
        <AuthRoute path="/signup" component={RegisterForm} routeType="auth" />
      </main>
      <footer><p>Footer</p></footer>
    </div>
  );
};

export default App;
