const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = mongoose.model('user');

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      return { loggedIn: false, errors: [message] };
    }

    const { firstName, lastName, email, password, zipCode } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { loggedIn: false, errors: ["User already exists"] };
    }

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
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    return { loggedIn: false, errors: [err] };
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

    if (!isValid) {
      return { loggedIn: false, errors: [message] };
    }

    // see if we can find the user
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { loggedIn: false, errors: ["Invalid Credentials"] };
    }

    // do the passwords match?
    let password_matches = await bcrypt.compareSync(
      data.password,
      user.password
    );
    if (password_matches) {
      const token = jwt.sign({ id: user._id }, keys.secretOrKey);
      return { token, loggedIn: true, ...user._doc, password: null };
    } else {
      return { loggedIn: false, errors: ["Invalid Credentials"] };
    }
  } catch (err) {
    return { loggedIn: false, errors: [err] }
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;

    // get the id of the encrypted user
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // return true if the id exists in the database
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });
    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };
