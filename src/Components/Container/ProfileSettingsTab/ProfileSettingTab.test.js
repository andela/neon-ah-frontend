import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ProfileSettingTab from './ProfileSettingsTab';
import { clearFlashMessage } from '../../../action/profileActions/profileActions';

const updateInput = (Form, instance, newValue) => {
  const input = Form.find(instance);
  input.simulate('change', {
    currentTarget: { value: newValue }
  });
  return Form.find(instance);
};

describe('Render Profile Settings Tab', () => {
  const wrapper = shallow(<ProfileSettingTab />);

  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ForgotPasswordForm', () => {
  const props = {
    userDetails: {
      bio: 'NY Times Best Selling Writer',
      email: 'samuel.adeniran@andela.com',
      fullName: 'Samuel Beef',
      getEmailsNotification: true,
      getInAppNotification: true,
      id: '6211521f-5baf-403e-9d66-04103240a5c2',
      img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
      updatedAt: '2019-02-26T23:03:15.144Z',
      userName: 'sam'
    },
    history: { push: jest.fn() },
    error: '',
    message: '',
    visible: true,
    postUserData: jest.fn(),
    clearFlashMessage: jest.fn()
  };

  const store = {
    getState: () => {
      return {
        profileReducer: {
          data: {},
          isLoading: true,
          error: '',
          isSelf: false,
          message: '',
          visible: false
        },
        signUpReducer: {
          isLoading: false,
          signUpCompleted: false,
          hasSignUpError: false,
          signUpError: null,
          message: null
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
        <ProfileSettingTab {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully', () => {
    expect(wrapper).toBeTruthy();
  });

  // user inputs information
  // it('simulates users filling the form', () => {
  //   const Form = shallow(<ProfileSettingTab />);
  //   // const Form = wrapper.find('Form');
  //   const fullNameInput = updateInput(Form, 'data-testid=fullName', 'Samuel Adeniran');
  //   const userNameInput = updateInput(Form, 'data-testid=userName', 'Samuel');
  //   const bioInput = updateInput(Form, 'data-testid=bio', 'Writer');
  //   const emailCheckInput = updateInput(Form, 'data-testid=emailNotification', true);
  //   const inAppCheckInput = updateInput(Form, 'data-testid=inAppNotification', true);
  //   const imgInput = updateInput(
  //     Form,
  //     'data-testid=image',
  //     'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
  //   );

  //   expect(fullNameInput.props().value).toBe('Samuel Adeniran');
  //   expect(userNameInput.props().value).toBe('Samuel');
  //   expect(bioInput.props().value).toBe('Writer');
  //   expect(emailCheckInput.props().value).toBe(true);
  //   expect(inAppCheckInput.props().value).toBe(true);
  //   expect(imgInput.props().value).toBe(
  //     'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
  //   );
  // });
  // form submits and api call is made

  it('should simulate handling form submit', () => {
    const preventDefault = jest.fn();
    wrapper.setProps({ postUserData: jest.fn('email'), history });
    wrapper.find('Form').simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toEqual(1);
  });
});
