import { extractErrorMessages, validateSignUpInput }from './signUp';

const emptyInput = {
  userName: '',
  password: '',
  email: '',
  fullName: ''
};

const shortInput = {
  userName: 'Y',
  password: 'u',
  email: 'jjjhhhk.com',
  fullName: 'l'
};

const invalidInput = {
  userName: 'kent&&',
  password: 'asdfghj',
  confirmPassword: 'jhgfdsa',
  email: 'jjjhhhk',
  fullName: 'John5657 As44'
};

describe('Sign Up Validation Test', () => {
  it('should give error for empty string input', () => {
    expect(validateSignUpInput(emptyInput).length).toEqual(4);
  });

  it('should give error for short string input', () => {
    expect(validateSignUpInput(shortInput).length).toEqual(3);
  });

  it('should give error for invalid string input', () => {
    expect(validateSignUpInput(invalidInput).length).toEqual(3);
  });
});

describe('extractErrorMessages function Test', () => {
  it('should successfully extract error messages', () => {
    expect(extractErrorMessages(validateSignUpInput(emptyInput)).length).toEqual(105);
  });

  it('should return nothing if array is empty', () => {
    expect(extractErrorMessages([]).length).toEqual(0);
  });
});
