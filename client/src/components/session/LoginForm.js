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

  // Renders invalid credentails error message
  renderErrorMessage() {
    const { errorMessage } = this.state;
    if (errorMessage.includes('incorrect')) {
      return errorMessage ? <p>{SessionUtil.stripGraphQLPrefix(errorMessage)}</p> : null;
    }
  }

  // Sets the local state with found error message
  handleGraphQLError(error) {
    if (this._isMounted) this.setState({ errorMessage: error.message })
  }

  render() {
    const { email, password, errorMessage } = this.state;

    // Setting correct error message
    let emailError = '', passwordError = '';

    if (errorMessage) {
      if (errorMessage.includes('Email required')) {
        emailError = 'Please fill out this field.';
      } else if (errorMessage.includes('Invalid email')) {
        emailError = 'Please include an \'@\' and a domain in the email address.';
      } else if (errorMessage.includes('Password required')) {
        passwordError = 'Please fill out this field.';
      }
    }

    console.log(errorMessage);

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.loginAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (
          <div className="login-form-container"> 
            <div className="login navbar-container">
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

            <div className="login body-container">
              <div className="login main-form-container">
                <div className="login header-container">
                  <h1>Log In to Morsel</h1>

                  <p>New to Morsel? <Link to='/signup'>Sign Up</Link></p>

                  <small>By logging in, you agree to Morsel's Terms of Service and Privacy Policy.</small>

                  <button onClick={this.performMutation(LoginUser, { email: 'onionking@gmail.com', password: '12345678' })}>Demo Login</button>

                  <p className="or-separator-wrapper">or</p> 
                </div>

                <div className="login form-container">
                  <form onSubmit={this.performMutation(LoginUser, {email, password})}>
                    <div className="login email-input">
                      <input
                        value={email}
                        onChange={this.update("email")}
                        placeholder="Email"
                      />

                      {emailError.length ? 
                        <div className='email-error-container'>
                          <div className="error text-wrapper">
                            <div className="error-icon-wrapper"></div>
                            <p>{emailError}</p>
                          </div>
              
                          <div className="errors triangle-wrapper">
                            <div className="errors inner-triangle-wrapper"></div>
                          </div>
                        </div> : ''}
                    </div>

                    <div className="login password-input">
                      <input
                        value={password}
                        onChange={this.update("password")}
                        type="password"
                        placeholder="Password"
                      />

                      {passwordError.length ? 
                        <div className="password-error-container">
                          <p>{passwordError}</p>
                        </div> : ''}
                    </div>

                    <button type="submit">Log In</button>

                    <small>New to Morsel? <Link to='/signup'>Sign Up</Link></small>
                  </form>
                </div>
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