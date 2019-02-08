import React from 'react';
import { shallow, mount } from 'enzyme';
import ResetPasswordForm from './ResetPasswordForm';
import { BrowserRouter as Router, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const sendPasswordReducer = {
  message: {}
};
const mockStore = configureMockStore([thunk]);

const store = mockStore({ sendPasswordReducer });

describe('<ResetPasswordForm />', () => {
  const wrapper = shallow(<ResetPasswordForm />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('click events', () => {
  const props = {
    message: 'sup',
    history,
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

  it('should render succesfully', () => {
    const handleFormSubmit = jest.fn();

    const resetPasswordForm = wrapper.find('form');
    resetPasswordForm.simulate('submit');
  });
});
