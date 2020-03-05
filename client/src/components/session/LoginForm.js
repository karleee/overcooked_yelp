import React from 'react';
import { Mutation } from 'react-apollo';

import * as SessionUtil from '../../util/session_util';
import Mutations from '../../graphql/mutations';
const { LOGIN_USER } = Mutations;

class LoginForm extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.performMutation.bind(this);
    this.handleGraphQLError.bind(this);
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
    SessionUtil.saveUserToCache(client, data.login);
  }

  loginAndRedirectTo(url, data) {
    SessionUtil.saveUserToLocalStorage(data.login);
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
    if (this._isMounted) this.setState({ errorMessage: error.message })
  }

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.loginAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (
          <div>
            {this.renderErrorMessage()}
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
export default LoginForm;