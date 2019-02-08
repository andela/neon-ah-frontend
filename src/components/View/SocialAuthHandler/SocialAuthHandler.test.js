import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import SocialAuthHandler from './SocialAuthHandler';
import { loginSocial, loginError } from '../../../action/authActions/authActions';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<SocialAuthHandler />', () => {
  const returnedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMDA4N2EwNy0xMmEyLTQ2NzctOTM4OS05ZjNlNTA3ZDA1NTYiLCJ1c2VyTmFtZSI6InVzZXIxMDIxODc4Njk5MjY1MjEzNiIsInVzZXJFbWFpbCI6InJlZG9saXZlNUB5YWhvby5jb20iLCJyb2xlSWQiOiIzY2ViNTQ2ZS0wNTRkLTRjMWQtODg2MC1lMjdjMjA5ZDRhZTMiLCJpYXQiOjE1NDk4MDgwNDEsImV4cCI6MTU4MTM2NTY0MX0.r3XFqcSA1y3hzxQzlm54P5Cz_7wtXU5ITbUECXH3yZY';

  const props = {
    history: { push: () => {} },
    location: {
      search: `?token=${returnedToken}`
    },
    authError: () => loginError('Sample'),
    completeSocialAuth: () => loginSocial(props.history, returnedToken)
  };

  it('should render without crashing', () => {
    const socialAuthHandlerSnapshot = shallow(<SocialAuthHandler />);
    expect(socialAuthHandlerSnapshot).toMatchSnapshot();
  });

  it('should authenticate user and save user token to localStorage', () => {
    const KEY = 'userToken';
    const VALUE = returnedToken;

    mount(
      <Provider store={store}>
        <SocialAuthHandler {...props} />
      </Provider>
    );

    expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
    expect(localStorage.__STORE__[KEY]).toBe(VALUE);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it('should return error when malformed token is provided', () => {
    props.location.search = `?error=400`;

    mount(
      <Provider store={store}>
        <SocialAuthHandler {...props} />
      </Provider>
    );

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });

  it('should return error when no query params are passed to the route', () => {
    props.history.push = jest.fn();
    props.location.search = '';

    mount(
      <Provider store={store}>
        <SocialAuthHandler {...props} />
      </Provider>
    );

    expect(props.history.push).toBeCalled();
  });
});
