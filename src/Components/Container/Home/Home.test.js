import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Home } from './Home';

const props = {
  articles: [
    {
      id: '20132ac5-e241-4033-a995-aa86cc6071ca',
      slug: 'lights-camera-action-f9zwlFCO',
      title: 'Lights Camera Action',
      content: "<h1 style='margin'>Lorem Ipsum</h1> <h4 style>",
      banner: 'https://res.cloudinary.com/jesseinit/image/upload/v1550738292/article-images/cg08afbe4rfsmsl4ijk1.jpg',
      timeToRead: 3,
      isPublished: true,
      isReported: false,
      userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
      averageRating: 0,
      createdAt: '2019-02-20 02:15:13.466076+01',
      updatedAt: '2019-02-20 02:15:13.466076+01',
      author: {
        userName: 'kabir',
        bio: 'Learning life now',
        img: null,
        fullName: 'Kabir Alausa'
      },
      tags: ['lights', 'actions', 'camera'],
      comments: [],
      message: '',

      response: {}
    }
  ],
  tags: [],
  auth: {
    isAuthenticated: false
  }
};
const store = {
  getState: () => {
    return {
      auth: { isAuthenticated: false },
      tagsReducer: {
        tags: [
          {
            id: '5e722316-bcee-43e4-8ce4-813d1c9f8f4d',
            name: 'stating out',
            createdAt: '2019-02-20 02:15:13.466076+01',
            updatedAt: '2019-02-20 02:15:13.466076+01'
          }
        ]
      },
      homePageArticlesReducer: {
        articles: [
          {
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
            createdAt: '2019-02-20 02:15:13.466076+01',
            updatedAt: '2019-02-20 02:15:13.466076+01',
            author: {
              userName: 'kabir',
              bio: 'Learning life now',
              img: null,
              fullName: 'Kabir Alausa'
            },
            tags: ['lights', 'actions', 'camera'],
            comments: [],
            message: '',

            response: {}
          }
        ]
      },
      signUpReducer: {
        isLoading: false,
        signUpCompleted: false,
        hasSignUpError: false,
        signUpError: null,
        message: null
      },
      profileReducer: {
        data: {},
        isLoading: true,
        error: '',
        isSelf: false,
        message: '',
        visible: false
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
      <Home {...props} />
    </MemoryRouter>
  </Provider>
);

test('<Home />', () => {
  expect(wrapper).toMatchSnapshot();
});
