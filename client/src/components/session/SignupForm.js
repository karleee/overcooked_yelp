import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as SessionUtil from '../../util/session_util';
import Mutations from '../../graphql/mutations';
import '../../assets/stylesheets/SignupForm.css';

const { REGISTER_USER, LOGIN_USER } = Mutations;

class RegisterForm extends React.Component { 
  // _isMounted = false;

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
    this.monitorClick();
    this.performMutation.bind(this);
  }

  // Monitors user clicking and closes error if necessary
  monitorClick() {
    window.addEventListener('click', e => {
      if (e.target.parentElement.className !== 'login email-input') {
        this.setState({ errorMessage: '' });
      }
    });
  }

  // componentDidMount() {
  //   this._isMounted = true;
  // }

  componentWillUnmount() {
    this.setState({ errorMessage: '' });
    // this._isMounted = false;
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    const clientData = data.login || data.register;
    SessionUtil.saveUserToCache(client, clientData);
  }

  registerAndRedirectTo(url, data) {
    SessionUtil.saveUserToLocalStorage(data.register);
    this.props.history.push(url);
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
    this.setState({ errorMessage: error.message });
  }

  demoSignUp() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.loginAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {LoginUser => (<button onClick={this.performMutation(LoginUser, { email: 'chocolatte@gmail.com', password: '12345678' })}>Demo Sign Up</button>)}
      </Mutation>
    );
  }

  render() {
    const { firstName, lastName, email, password, zipCode, errorMessage } = this.state;
    let error = '';

    // Setting correct email message
    if (errorMessage.includes('required')) {
      error = 'Please fill out this field.';
    } else if (errorMessage.includes('invalid')) {
      error = 'Please include an \'@\' and a domain in the email address.';
    } else if (errorMessage.includes('credentials')) {
      error = 'The email address you entered has already been registered.';
    }

    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.registerAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {RegisterUser => (
          <div className="signup page-container">
            <div className="signup navbar-container">
              <svg>
                <Link to='/'>
                  <text x="50%" y="50%">morsel</text>
                </Link>
              </svg>
            </div> 

            <div className="signup credentials-error-container">
              {errorMessage.includes('credentials') ? <p>{error}</p> : ''}
            </div>

            <div className="signup content-container">
              <div className="signup form-container">
                <div className="signup header-container">
                  <h1>Sign Up for Morsel</h1>

                  <p>Connect with great local businesses</p>

                  <small>By continuing, you agree to Morsel's Terms of Service and Privacy Policy.</small>

                  {this.demoSignUp()}

                  <p className="or-separator-wrapper">or</p>
                </div>

                <form
                  onSubmit={this.performMutation(RegisterUser, {  
                    firstName,
                    lastName,
                    email,
                    password, 
                    zipCode
                  })}
                >
                  <div className="signup first-last-name-container">
                    <div className="signup name-wrapper">
                      <input
                        value={firstName}
                        onChange={this.update('firstName')}
                        placeholder="First Name"
                      />

                      {errorMessage.includes('First name') ?
                        <div className='signup error-container'>
                          <div className="error text-wrapper">
                            <img src="/images/session/error_icon.png" alt="Error" />
                            <p>{error}</p>
                          </div>

                          <div className="errors triangle-wrapper">
                            <div className="errors inner-triangle-wrapper"></div>
                          </div>
                        </div> : ''}
                    </div>

                    <div className="signup name-wrapper">
                      <input
                        value={lastName}
                        onChange={this.update('lastName')}
                        placeholder="Last Name"
                      />

                      {errorMessage.includes('Last name') ?
                        <div className='signup error-container'>
                          <div className="error text-wrapper">
                            <img src="/images/session/error_icon.png" alt="Error" />
                            <p>{error}</p>
                          </div>

                          <div className="errors triangle-wrapper">
                            <div className="errors inner-triangle-wrapper"></div>
                          </div>
                        </div> : ''}
                    </div>
                  </div>

                  <div className="signup email-wrapper">
                    <input
                      value={email}
                      onChange={this.update('email')}
                      placeholder="Email"
                    />

                    {errorMessage.includes('Email') ?
                      <div className='signup error-container'>
                        <div className="error text-wrapper">
                          <img src="/images/session/error_icon.png" alt="Error" />
                          <p>{error}</p>
                        </div>

                        <div className="errors triangle-wrapper">
                          <div className="errors inner-triangle-wrapper"></div>
                        </div>
                      </div> : ''}
                  </div>

                  <div className="signup password-wrapper">
                    <input
                      value={password}
                      onChange={this.update('password')}
                      type="password"
                      placeholder="Password"
                    />

                    {errorMessage.includes('Password') ?
                      <div className='signup error-container'>
                        <div className="error text-wrapper">
                          <img src="/images/session/error_icon.png" alt="Error" />
                          <p>{error}</p>
                        </div>

                        <div className="errors triangle-wrapper">
                          <div className="errors inner-triangle-wrapper"></div>
                        </div>
                      </div> : ''}
                  </div>

                  <div className="signup zip-code-wrapper">
                    <input
                      value={zipCode}
                      onChange={this.update('zipCode')}
                      type="number"
                      placeholder="Zip Code"
                    />

                    {errorMessage.includes('Zip code') ?
                      <div className='signup error-container'>
                        <div className="error text-wrapper">
                          <img src="/images/session/error_icon.png" alt="Error" />
                          <p>{error}</p>
                        </div>

                        <div className="errors triangle-wrapper">
                          <div className="errors inner-triangle-wrapper"></div>
                        </div>
                      </div> : ''}
                  </div>

                  <button type="submit">Sign Up</button>

                  <small>Already on Morsel? <Link to='/login'>Log In</Link></small>
                </form>
              </div>

              <img src="/images/session/login_image.png" alt="Sign up splash thumbnail" />
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
export default RegisterForm;