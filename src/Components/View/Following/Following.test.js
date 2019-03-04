import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import Following from './Following';

const props = {
  followers: [
    {
      bio: 'I am the Awesome',
      fullName: 'Raf Mme',
      id: '88b1ac38-9d4d-40ae-9662-269e54dd0645',
      img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551443205/article-images/w46n5znxfnnv5v7ksgfl.png',
      userName: 'rafmme'
    }
  ],
  auth: { isAuthenticated: true },
  data: [
    {
      articles: [],
      bio: 'Learning life now',
      email: 'kabir@now.com',
      followers: [],
      following: [],
      fullName: 'Kabir Alausa',
      getEmailsNotification: true,
      getInAppNotification: false,
      id: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
      img: null,
      userName: 'kabir'
    }
  ]
};
const store = {
  getState: () => {
    return {
      getFollowersAuthorApiCall: {
        followers: [
          {
            bio: 'I am the Awesome',
            fullName: 'Raf Mme',
            id: '88b1ac38-9d4d-40ae-9662-269e54dd0645',
            img:
              'https://res.cloudinary.com/jesseinit/image/upload/v1551443205/article-images/w46n5znxfnnv5v7ksgfl.png',
            userName: 'rafmme'
          }
        ]
      },
      auth: { isAuthenticated: true },
      searchFunctionalityReducer: { following: [] },
      profileReducer: { data: [] }
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
      <Following {...props} />
    </MemoryRouter>
  </Provider>
);

test('<Following />', () => {
  expect(wrapper).toMatchSnapshot();
});
