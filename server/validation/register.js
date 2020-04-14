const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  data.firstName = validText(data.firstName) ? data.firstName : '';
  data.lastName = validText(data.lastName) ? data.lastName : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.zipCode = validText(data.zipCode) ? data.zipCode : '';

  if (Validator.isEmpty(data.firstName)) {
    return { message: 'First name required', isValid: false };
  }

  if (Validator.isEmpty(data.lastName)) {
    return { message: 'Last name required', isValid: false };
  }

  if (!Validator.isEmail(data.email)) {
    return { message: 'Email is invalid', isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: 'Email field is required', isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: 'Password field is required', isValid: false };
  }

  if (Validator.isEmpty(data.zipCode)) {
    return { message: 'Zip code field is required', isValid: false };
  }
  
  return {
    message: '',
    isValid: true
  };
};
