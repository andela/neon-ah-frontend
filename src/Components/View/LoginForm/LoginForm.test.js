import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { checkProps } from '../../../utils/testUtils';
import Login from './LoginForm';

const setUp = (props = {}) => {
  const component = mount(
    <Router>
      <Login {...props} />
    </Router>
  );
  return component;
};

const props = {
  auth: {}
};

const store = {
  getState: () => {
    return {
      sendEmailReducer: {
        isEmailSent: false
      },
      auth: {
        isAuthenticated: false,
        roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae4',
        loginErrors: [],
        isLoading: false
      },
      signUpReducer: {
        isLoading: false,
        signUpCompleted: false,
        hasSignUpError: false,
        signUpError: null,
        message: null
      },
      readArticleReducer: {
        article: {
          id: '20132ac5-e241-4033-a995-aa86cc6071ca',
          slug: 'lights-camera-action-f9zwlFCO',
          title: 'Lights Camera Action',
          content: "<h1 style='margin'>Lorem Ipsum</h1> <h4 style>",
          banner:
            'https://res.cloudinary.com/jesseinit/image/upload/v1550738292/article-images/cg08afbe4rfsmsl4ijk1.jpg',
          timeToRead: 3,
          isPublished: true,
          isReported: false,
          userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
          averageRating: 0,
          createdAt: 'Thu Feb 21 2019 8:48:54 AM',
          updatedAt: 'Thu Feb 21 2019 8:48:54 AM'
        },
        author: {
          userName: 'kabir',
          bio: 'Learning life now',
          img: null,
          fullName: 'Kabir Alausa'
        },
        tags: ['lights', 'actions', 'camera'],
        comments: [],
        message: '',
        isLoading: false,
        response: {}
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
      <Login {...props} />
    </MemoryRouter>
  </Provider>
);

describe('Login Component', () => {
  const app = shallow(
    <Router>
      <Login />
    </Router>
  ).dive();
  it('renders Form', () => {});
  describe('Snapshot', () => {
    const wrapper = shallow(<Login />);
    it('should render successfully', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Testing PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        auth: { name: 'myName', food: 'myFood' },
        completeLoginLocal: () => {
          return null;
        },
        clearErrors: () => {
          return null;
        },
        history: { name: 'myName', food: 'myFood' }
      };
      const propsErr = checkProps(Login, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
});
