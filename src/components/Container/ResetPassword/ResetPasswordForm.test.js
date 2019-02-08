import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPasswordForm from './ResetPasswordForm';

const sendPasswordReducer = {
  message: {}
};
const mockStore = configureMockStore([thunk]);

const store = mockStore({ sendPasswordReducer });

describe('<ResetPasswordForm />', () => {
  it('should render succesfully', () => {
    const wrapper = shallow(<ResetPasswordForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render succesfully', () => {
    const props = {
      message: {},
      history: {},
      match: {
        params: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        }
      },
      setMessage: () => jest.fn()
    };

    const wrapper = mount(
      <StaticRouter context={{}}>
        <Provider store={store}>
          <ResetPasswordForm {...props} />
        </Provider>
      </StaticRouter>
    );

    const handleFormSubmit = jest.fn();

    const resetPasswordForm = wrapper.find('form');
    resetPasswordForm.simulate('submit');
  });
});

describe('click events', () => {});
