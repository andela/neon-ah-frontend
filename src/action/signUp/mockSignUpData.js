const mockSignUpData = {
  errorResponse: {
    message: 'Login failed'
  },
  successResponse: {
    status: 'success',
    data: {
      statusCode: 201,
      message: 'Kindly your check your email to verify your account'
    }
  },
  signupData: {
    userName: 'Agent007',
    fullName: 'James Bond',
    email: 'jamesbond@mi.com',
    password: 'bond23martin',
    confirmPassword: 'bond23martin'
  }
};

export default mockSignUpData;
