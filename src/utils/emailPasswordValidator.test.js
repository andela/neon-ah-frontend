import validator from './emailPasswordValidator';

describe('Email validator rest', () => {
  test('should successfully validate a user email', () => {
    expect(validator.email('tejirimatthew@gmail.com')).toBe(undefined);
  });
  test('should successfully validate a user password', () => {
    expect(validator.password('22AAaa')).toBe(undefined);
  });
  test('should check for invalid email address', () => {
    expect(validator.email('aa')).toBe('Invalid email address');
  });
  test('should check for invalid password', () => {
    expect(validator.password('22Aaa')).toBe(
      'Password cannot be less than 6 characters, at least 1 uppercase, 1 number and one lowercase'
    );
  });
});
