import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import AccountVerify from './AccountVerify';

describe('Render AccountVerify Component ', () => {
  const wrapper = shallow(<AccountVerify />);
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('AccountVerify Component', () => {
  const props = {
    statusCode: 0,
    history,
    match: {
      params: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      }
    },
    verifyUser: () => jest.fn()
  };
  const store = {
    getState: () => {
      return {
        accountVerifyReducer: {
          statusCode: 0
        }
      };
    },
    subscribe: () => {
      return store.getState();
    },
    dispatch: () => {}
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <AccountVerify {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully with a valid token', () => {
    expect(wrapper).toBeTruthy();
  });
});

describe('AccountVerify Component', () => {
  const props = {
    statusCode: 0,
    history: { push: jest.fn() },
    match: {
      params: {
        token: 'invalid_token'
      }
    },
    verifyUser: () => jest.fn()
  };
  const store = {
    getState: () => {
      return {
        accountVerifyReducer: {
          statusCode: 0
        }
      };
    },
    subscribe: () => {
      return store.getState();
    },
    dispatch: () => {}
  };
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <AccountVerify {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully with a valid token', () => {
    expect(wrapper).toBeTruthy();
  });
});
