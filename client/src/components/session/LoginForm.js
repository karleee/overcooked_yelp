import React from 'react';
import { Mutation } from 'react-apollo';
import * as SessionUtil from '../../util/session_util';
import Mutations from '../../graphql/mutations';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/App.css';
import '../../assets/stylesheets/LoginForm.css';

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
          <div className="login-form-container"> 
              <div className="login-form-header">
                <Link to='/'>
                  <div className="logo-wrapper">
                    <svg>
                      <text x="50%" y="50%">morsel</text>
                    </svg>

                    <img src="/images/homepage/logo.png" alt="Logo" />
                  </div>
                </Link>
              </div>

            {this.renderErrorMessage()}

            <div className="login-form-body-container">
              <div className="login-main-form-container">
                <h1>Log In to Morsel</h1>

                <p>New to Morsel? <Link to='/signup'>Sign Up</Link></p>

                <small>By logging in, you agree to Morsel's Terms of Service and Privacy Policy.</small>

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

                  <small>New to Morsel? <Link to='/signup'>Sign Up</Link></small>
                </form>
              </div>

              <div className="login-form-image-container">
                <img src="/images/session/login_image.png" alt="Log in splash thumbnail" />
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
export default LoginForm;