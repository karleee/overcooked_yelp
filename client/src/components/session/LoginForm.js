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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.monitorClick();
    this.performMutation.bind(this);
    this.handleGraphQLError.bind(this);
  }

  // Monitors user clicking and closes error if necessary
  monitorClick() {
    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'login email-input') {
        this.setState({ errorMessage: '' });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ errorMessage: '' });
  }

  // Update user input
  // Remove error message upon input update
  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
      this.setState({ errorMessage: '' }); 
    }
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

  // Sets the local state with found error message
  handleGraphQLError(error) {
    this.setState({ errorMessage: error.message });
  }

  render() {
    const { email, password, errorMessage } = this.state;

    // Setting correct error message
    let error = '';

    if (errorMessage.includes('required')) {
      error = 'Please fill out this field.';
    } else if (errorMessage.includes('invalid')) {
      error = 'Please include an \'@\' and a domain in the email address.';
    } else if (errorMessage.includes('credentials')) {
      error = 'The email address or password you entered is incorrect.';
    }

    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.loginAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (
          <div className="login page-container"> 
            <div className="login navbar-container">
                <svg>
                  <Link to='/'>
                    <text x="50%" y="50%">morsel</text>
                  </Link>
                </svg>
            </div> 

            {errorMessage.includes('credentials') ? <div className="login credentials-error-container"><p>{error}</p></div> : ''}

            <div className="login content-container">
              <div className="login form-container">
                <div className="login header-container">
                  <h1>Log In to Morsel</h1>

                  <p>New to Morsel? <Link to='/signup'>Sign Up</Link></p>

                  <small>By logging in, you agree to Morsel's Terms of Service and Privacy Policy.</small>

                  <button onClick={this.performMutation(LoginUser, { email: 'onionking@gmail.com', password: '12345678' })}>Demo Login</button>

                  <p className="or-separator-wrapper">or</p> 
                </div>

                <form onSubmit={this.performMutation(LoginUser, {email, password})}>
                  <div className="login email-container">
                    <input
                      value={email}
                      onChange={this.update("email")}
                      placeholder="Email"
                    />

                    {errorMessage.includes('Email') ? 
                      <div className='login error-container'>
                        <div className="error text-wrapper">
                          <img src="/images/session/error_icon.png" alt="Error" /> 
                          <p>{error}</p>
                        </div>
              
                        <div className="errors triangle-wrapper">
                          <div className="errors inner-triangle-wrapper"></div>
                        </div>
                      </div> : ''}
                  </div>

                  <div className="login password-container">
                    <input
                      value={password}
                      onChange={this.update("password")}
                      type="password"
                      placeholder="Password"
                    />

                    {errorMessage.includes('Password') ? 
                      <div className="login error-container">
                        <div className="error text-wrapper">
                          <img src="/images/session/error_icon.png" alt="Error" />
                          <p>{error}</p> 
                        </div>

                        <div className="errors triangle-wrapper">
                          <div className="errors inner-triangle-wrapper"></div>
                        </div>
                      </div> : ''}
                  </div>

                  <button type="submit">Log In</button>

                  <small>New to Morsel? <Link to='/signup'>Sign Up</Link></small>
                </form>
              </div>

              <img src="/images/session/login_image.png" alt="Log in splash thumbnail" />
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
export default LoginForm;