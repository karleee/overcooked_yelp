import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as SessionUtil from '../../util/session_util';
import Mutations from '../../graphql/mutations';
import '../../assets/stylesheets/SignupForm.css';

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
    const vegetables = [
      'leek',
      'carrot',
      'potato',
      'yam',
      'bokchoy',
      'broccoli',
      'beet',
      'celery',
      'lettuce',
      'cucumber',
      'kale',
      'turnip',
      'tomato',
      'okra',
      'radish',
      'pumpkin',
      'avocado',
      'squash',
      'zucchini',
      'artichoke',
      'cabbage',
      'fennel'
    ];
    const zipCodes = ['94016', '96150', '96795', '90001', '94599', '97035'];

    const randomVeggie = vegetables[Math.floor(Math.random() * vegetables.length)];
    const randomZipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={error => this.handleGraphQLError(error)}
        onCompleted={data => this.registerAndRedirectTo('/', data)}
        update={(client, data) => this.updateCache(client, data)}
      >
        {RegisterUser => (
          <div className="signup-form-container">
            <div className="signup-form-header">
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

            <div className="signup-form-body-container">
              <div className="signup-main-form-container">
                <h1>Sign Up for Morsel</h1>

                <p>Connect with great local businesses</p>

                <small>By continuing, you agree to Morsel's Terms of Service and Privacy Policy.</small>

                <button onClick={this.performMutation(RegisterUser, { 
                  firstName: `${randomVeggie[0].toUpperCase() + randomVeggie.slice(1, randomVeggie.length)}`,
                  lastName: 'Queen',
                  zipCode: `${randomZipCode}`,
                  email: `${randomVeggie}@gmail.com`, 
                  password: '12345678'  
                })}>Demo Sign Up</button>

                <p className="or-separator-wrapper">or</p>

                <form
                  onSubmit={this.performMutation(RegisterUser, {  
                    firstName,
                    lastName,
                    email,
                    password,
                    zipCode
                  })}
                >
                  <div className="first-and-last-name-container">
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

              <div className="signup-form-image-container">
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