import React from "react";

import { AuthRoute } from "../util/route_util";
import LoginForm from "./session/LoginForm";
import RegisterForm from "./session/RegisterForm";
import SessionButton from "./session/SessionButton";
import ExampleGreeting from "./session/ExampleGreeting";

const LoginPage = () => <div><LoginForm /></div>;
const RegisterPage = () => <div><RegisterForm /></div>;

const App = () => {
  return (
    <div>
      <header>
        <h1>Temporary Homepage!</h1>
        <ExampleGreeting />
        <SessionButton />
      </header>
      <main>
        <AuthRoute path="/login" component={LoginPage} routeType="auth" />
        <AuthRoute path="/signup" component={RegisterPage} routeType="auth" />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default App;
