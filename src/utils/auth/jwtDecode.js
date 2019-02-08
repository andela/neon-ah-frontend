import jwtDecode from 'jwt-decode';

const isTokenValid = token => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return false;
  }
};

export default isTokenValid;
