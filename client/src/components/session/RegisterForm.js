import React from 'react';
import { Mutation } from 'react-apollo';

import * as SessionUtil from '../../util/session_util';
import Mutations from '../../graphql/mutations';
const { REGISTER_USER } = Mutations;

class RegisterForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      zipCode: '',
      errorMessage: ''
    };
    this.performMutation.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.setState({ errorMessage: '' });
    this._isMounted = false;
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    SessionUtil.saveUserToCache(client, data.register);
  }

  registerAndRedirectTo(url, data) {
    SessionUtil.saveUserToLocalStorage(data.register);
    this.props.history.push(url);
  }

  performMutation(Mutation, variables) {
    return e => {
      e.preventDefault();
      Mutation({ variables });
    };
  }

  renderErrorMessage() {
    const { errorMessage } = this.state;
    return (errorMessage) ? <p>{SessionUtil.stripGraphQLPrefix(errorMessage)}</p> : null;
  }

  handleGraphQLError(error) {
    this.setState({ errorMessage: error.message });
  }

  render() {
    const { firstName, lastName, email, password, zipCode } = this.state;
    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.registerAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {RegisterUser => (
          <div>
            {this.renderErrorMessage()}
            <form
              onSubmit={this.performMutation(RegisterUser, {
                firstName,
                lastName,
                email,
                password,
                zipCode
              })}
            >
              <input
                value={firstName}
                onChange={this.update('firstName')}
                placeholder="First Name"
              />
              <input
                value={lastName}
                onChange={this.update('lastName')}
                placeholder="Last Name"
              />
              <input
                value={email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              <input
                value={password}
                onChange={this.update('password')}
                type="password"
                placeholder="Password"
              />
              <input
                value={zipCode}
                onChange={this.update('zipCode')}
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