export default {
  email: value =>
    value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Invalid email address',
  password: value =>
    value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/.test(value)
      ? undefined
      : 'Password cannot be less than 6 characters, at least 1 uppercase, 1 number and one lowercase'
};
