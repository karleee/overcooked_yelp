const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = mongoose.model('user');

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) throw new Error(message);

    const { firstName, lastName, email, password, zipCode } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        zipCode
      },
      err => {
        if (err) throw err;
      }
    );

    await user.save();
    // we'll create a token for the user
    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw new Error(err);
  }
};

const logout = async data => {
  try {
    const user = await User.findById(data._id);
    const token = "";
    return { token, loggedIn: false, ...user._doc };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    // validate the data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) throw new Error(message);

    // see if we can find the user
    const user = await User.findOne({ email: data.email });

    if (!user) throw new Error("Invalid Credentials");

    // do the passwords match?
    let password_matches = await bcrypt.compareSync(
      data.password,
      user.password
    );
    if (password_matches) {
      const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
      return { token, loggedIn: true, ...user._doc, password: null };
    } else {
      throw new Error('Invalid Credentials');
    }
  } catch (err) {
    throw new Error(err);
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;

    // get the id of the encrypted user
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    // return true if the id exists in the database
    let sessionUser = await User.findById(_id);
    if (sessionUser) {
      const loggedIn = !!sessionUser;
      return { loggedIn, ...sessionUser._doc, password: null };
    } else {
      return { loggedIn: false, _id: null }
    }
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };