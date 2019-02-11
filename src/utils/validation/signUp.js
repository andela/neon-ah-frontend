/**
 * @description a function to validate sign up data
 * @param {String} fullname
 * @returns {Object} an objects containing the error messages
 */
const validateSignUpInput = ({ fullName, userName, password, email, confirmPassword }) => {
  const errors = {};
  // eslint-disable-next-line max-len
  const emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const fullNamePattern = /[`~/\\±§_+\-=!@#$%^&*(),.?":{}|<>0-9]/g;
  const userNamePattern = /^[a-zA-Z0-9]+$/;

  if (email && email.match(emailPattern) === false) {
    errors.email = 'Please provide a valid email';
  }
  if (!email || email === '') {
    errors.email = 'Email cannot be empty';
  }
  if (fullName.trim() === '') {
    errors.fullname = 'Fullname cannot be empty';
  }
  if (fullName.trim() !== '' && fullName.length < 2) {
    errors.fullname = 'Fullname is too short';
  }
  if (fullName.length >= 2 && fullName.match(fullNamePattern)) {
    errors.fullname = 'Fullname cannot contain special characters or numbers';
  }
  if (password.trim() === '') {
    errors.password = 'Password cannot be empty';
  }
  const checkPassword = password.trim() !== '' && password.length < 6;
  if (checkPassword) {
    errors.password = 'Password cannot be less than 6 Characters';
  }

  if (password.length >= 6 && password !== confirmPassword) {
    errors.password = 'Password confirmation does not match password';
  }

  if (userName.trim() === '') {
    errors.userName = 'Username cannot be empty';
  }
  if (userName.trim() !== '' && userName.length < 2) {
    errors.userName = 'Username is too short';
  }

  if (userName.length >= 2 && !userName.match(userNamePattern)) {
    errors.userName = 'Username can not contain special characters';
  }

  return Object.values(errors);
};

const extractErrorMessages = arrayOfMessages => {
  let text = '';
  arrayOfMessages.forEach(message => {
    text = `\n${text + message};\n`;
  });
  return text;
};

export { validateSignUpInput, extractErrorMessages };
