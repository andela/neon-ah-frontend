import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ProfilePage from './ProfilePage';

describe('Render ProfilePage Component ', () => {
  const wrapper = shallow(<ProfilePage />);
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ProfilePage/>', () => {
  const props = {
    isLoading: false,
    data: {
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
    match: {
      params: {
        username: 'sam'
      }
    },
    history: [],
    getUserData: jest.fn(),
    isSelf: true,
    error: ''
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
        },
        notification: {
          isLoading: false,
          notificationList: [],
          hasError: false,
          errorMessage: null
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
        <ProfilePage {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render component successfully', () => {
    expect(wrapper).toBeTruthy();
  });
});
