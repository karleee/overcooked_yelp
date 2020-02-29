import React from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

class RegisterForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      zipCode: "",
      errors: []
    };
    this.performMutation.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({ data: { isLoggedIn: data.register.loggedIn } });
  }

  registerAndRedirectTo(url, data) {
    if (data.register.isLoggedIn) {
      const { token } = data.register;
      localStorage.setItem("auth-token", token);
      this.props.history.push(url);
    } else {
      if (this._isMounted) {
        this.setState({ errors: data.register.errors });
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
    const { firstName, lastName, email, password, zipCode } = this.state;
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => this.registerAndRedirectTo("/", data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {RegisterUser => (
          <div>
            <ul>{this.renderErrors()}</ul>
            <form
              onSubmit={this.performMutation(RegisterUser, { firstName, lastName, email, password, zipCode })}
            >
              <input
                value={firstName}
                onChange={this.update("firstName")}
                placeholder="First Name"
              />
              <input
                value={lastName}
                onChange={this.update("lastName")}
                placeholder="Last Name"
              />
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
              <input
                value={zipCode}
                onChange={this.update("zipCode")}
                type="number"
                placeholder="Zip Code"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}
export default RegisterForm;