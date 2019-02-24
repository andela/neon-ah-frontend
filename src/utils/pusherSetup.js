import Pusher from 'pusher-js';
import jwtDecode from 'jwt-decode';

const pusher = new Pusher('58055a0cbc34e0d3f28b', {
  cluster: 'eu',
  forceTLS: true
});

/* istanbul ignore next */
const generateEventName = () => {
  try {
    const { userId } = jwtDecode(localStorage.userToken);
    return `${userId}-event`;
  } catch (error) {
    return 'event';
  }
};

export const eventName = generateEventName();
export default pusher;
