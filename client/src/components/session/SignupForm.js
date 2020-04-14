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
    let firstNameError = '';

    // Setting correct email message
    if (errorMessage.includes('First name required')) {
      firstNameError = 'Please fill out this field.';
    }

    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.registerAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {RegisterUser => (
          <div className="signup content-container">
            <div className="signup navbar-container">
              <svg>
                <Link to='/'>
                  <text x="50%" y="50%">morsel</text>
                </Link>
              </svg>
            </div> 

            {/* {this.renderErrorMessage()} */}

            <div className="signup body-container">
              <div className="signup main-form-container">
                <div className="signup header-container">
                  <h1>Sign Up for Morsel</h1>

                  <p>Connect with great local businesses</p>

                  <small>By continuing, you agree to Morsel's Terms of Service and Privacy Policy.</small>

                  {this.demoSignUp()}

                  <p className="or-separator-wrapper">or</p>
                </div>

                <div className="signup form-container">
                  <form
                    onSubmit={this.performMutation(RegisterUser, {  
                      firstName,
                      lastName,
                      email,
                      password,
                      zipCode
                    })}
                  >
                    <div className="signup first-last-name-input">
                      <div className="signup first-name-input">
                        <input
                          value={firstName}
                          onChange={this.update('firstName')}
                          placeholder="First Name"
                        />

                        {firstNameError.length ?
                          <div className='first-name-error-container'>
                            <div className="error text-wrapper">
                              <div className="error-icon-wrapper">
                                <img src="/images/session/error_icon.png" alt="Error" />
                              </div>
                              <p>{firstNameError}</p>
                            </div>

                            <div className="errors triangle-wrapper">
                              <div className="errors inner-triangle-wrapper"></div>
                            </div>
                          </div> : ''}
                      </div>

                      <div className="signup last-name-input">
                        <input
                          value={lastName}
                          onChange={this.update('lastName')}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

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

                    <small>Already on Morsel? <Link to='/login'>Log In</Link></small>
                  </form>
                </div>
              </div>

              <div className="signup image-container">
                <img src="/images/session/login_image.png" alt="Sign up splash thumbnail" />
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
export default RegisterForm;