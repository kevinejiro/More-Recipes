const EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
const USERNAME_REGEXP = /^(\w){4,15}$/;

/**
 *
 * @param {object} inputFields
 *
 * @returns {object} hasError, errors
 *
 */
export function signUpCheck(inputFields) {
  const {
    username,
    email,
    password,
    passwordConfirmation
  } = inputFields;

  const errors = {};

  if (username === '') {
    errors.username = 'Username is required';
  } else if (!USERNAME_REGEXP.test(username)) {
    errors.username = `Username must be between 4 and 
      15 characters long, with no space between characters`;
  }

  if (email === '') {
    errors.email = 'Email is required';
  } else if (email.length <= 7 ||
    email.length > 30 ||
    !EMAIL_REGEXP.test(email)) {
    errors.email = 'invalid email address';
  }

  if (password === '') {
    errors.password = 'Password is required';
  } else if (password.length < 7) {
    errors.password = 'Password must be at least 7 characters long';
  }
  if (passwordConfirmation !== password) {
    errors.passwordConfirmation = 'Password is\'nt the same as above';
  }

  return {
    hasError: !(Object.keys(errors).length === 0 &&
      errors.constructor === Object),
    error: errors
  };
}
/**
 *
 * @param {object} inputFields
 *
 * @returns {object} hasError, error message
 */
export function signInCheck(inputFields) {
  const {
    username,
    password
  } = inputFields;
  const errors = {};
  if (!username || !password) {
    errors.errorMessage = 'username and password are required';
  }
  return {
    hasError: !(Object.keys(errors).length === 0 &&
      errors.constructor === Object),
    error: errors
  };
}
