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

describe('ProfileSettingsTab', () => {
  const props = {
    userDetails: {
      userName: 'samuel',
      fullName: 'sam',
      bio: 'hello',
      email: 'samuel.adeniran@andela.com',
      getEmailsNotification: true,
      getInAppNotification: true,
      id: '6211521f-5baf-403e-9d66-04103240a5c2',
      img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
      updatedAt: '2019-02-26T23:03:15.144Z'
    },
    history: { push: jest.fn() },
    error: '',
    message: '',
    visible: true,
    postUserData: jest.fn(),
    clearFlashMessage: jest.fn(),
    validate: jest.fn(),
    validate: {
      fullName: 1,
      userName: 2,
      bio: 1
    }
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
          visible: false,
          loggedInUserData: {},
          fullName: 'sam',
          userName: 'samuel',
          bio: 'hello'
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

  it('should simulate handling form submit', () => {
    const preventDefault = jest.fn();
    wrapper.setProps({ postUserData: jest.fn('email'), history });
    wrapper.find('Form').simulate('submit', { preventDefault });
    expect(preventDefault.mock.calls.length).toEqual(1);
  });
});
