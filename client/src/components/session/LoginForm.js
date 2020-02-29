import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends React.Component {
  // is there a better way to handle this?
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: []
    };
    this.performMutation.bind(this);
  }

  componentDidMount() {
    // allow for errors to be set on state
    this._isMounted = true;
  }

  componentWillUnmount() {
    // prevent setState when unmounted
    this._isMounted = false;
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({ data: { isLoggedIn: data.login.loggedIn } });
  }

  loginAndRedirectTo(url, data) {
    const { token } = data.login;
    localStorage.setItem("auth-token", token);
    if (data.login.isLoggedIn) {
      this.props.history.push(url);
    } else {
      // check with TA if there is a better solution
      if (this._isMounted) {
        this.setState({ errors: data.login.errors });
      }
    }
  }

  performMutation(Mutation, variables) {
    return e => {
      e.preventDefault();
      Mutation({ variables });
    };
  }

  renderErrors() {
    const { errors } = this.state;
    if (errors && errors.length > 0) {
      return errors.map((msg, i) => <li key={i}>{msg}</li>);
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => this.loginAndRedirectTo("/", data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (
          <div>
            <ul>{this.renderErrors()}</ul>
            <form onSubmit={this.performMutation(LoginUser, {email, password})}>
              <input
                value={email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default Login;
