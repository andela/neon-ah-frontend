import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import SingleArticle from './SingleArticle';

const setUp = (props = {}) => {
  const component = shallow(<SingleArticle {...props} />);
  return component;
};
const props = {
  match: {
    isExact: true,
    params: {
      slug: 'lights-camera-action-f9zwlFCO'
    },
    path: '/articles/read/:slug',
    url: '/articles/read/lights-camera-action-f9zwlFCO'
  },
  article: {
    id: 1,
    title: 'The Article'
  },
  readArticleAction: jest.fn(),
  response: {
    id: 1,
    title: 'The Article'
  },
  loading: false,
  isAuthenticated: false,
  rating: 1
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
      },
      rateArticleReducer: {
        rating: 0,
        message: '',
        isLoading: false,
        response: {}
      },
      comment: {
        isLoading: false,
        commentCreated: false,
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
      <SingleArticle {...props} />
    </MemoryRouter>
  </Provider>
);

describe('Single Article"', () => {
  describe('General rendering', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });
    it('Should render no singleArticle element when no slug is sent', () => {
      const wrapper = findByTestAttr(component, 'singleArticle');
      expect(wrapper.length).toBe(0);
    });
    it('Should render successfully', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('Testing PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        article: {
          id: 1,
          title: 'The Article'
        },
        readArticleAction: () => {},
        response: {
          id: 1,
          title: 'The Article'
        },
        loading: true
      };
      const propsErr = checkProps(SingleArticle, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have Props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        article: {
          id: 1,
          title: 'The Article'
        },
        readArticleAction: () => {},
        response: {
          id: 1,
          title: 'The Article'
        },
        loading: true
      };
      wrapper = setUp(props);
    });
    it('Should render successfully', () => {
      const component = findByTestAttr(wrapper, 'singleArticle');
      expect(component.length).toBe(0);
    });
  });
  describe('Have No Props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it('Should render for optional props', () => {
      const component = findByTestAttr(wrapper, 'singleArticle');
      expect(component.length).toBe(0);
    });
  });
});
