import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import ReadStats from './ReadStats';

const props = {
  readStats: [
    {
      id: 'cb642088-314a-402f-b848-77f415e2aa44',
      articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
      userId: '88b1ac38-9d4d-40ae-9662-269e54dd0645',
      createdAt: '2019-02-26T17:14:31.110Z',
      updatedAt: '2019-02-26T17:14:31.110Z',
      Article: {
        slug: 'my-first-jump-7wV8Wlvm',
        title: 'My First Jump',
        content: 'Sup',
        banner: 'https://res.cloudinary.com/jesseinit/image/upload/v1550654610/article-images/memphis-colorful.png',
        timeToRead: 2,
        createdAt: '2019-02-21T00:57:22.454Z'
      }
    }
  ]
};

const store = {
  getState: () => {
    return {
      readStatsReducer: {
        readStats: [
          {
            id: 'cb642088-314a-402f-b848-77f415e2aa44',
            articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
            userId: '88b1ac38-9d4d-40ae-9662-269e54dd0645',
            createdAt: '2019-02-26T17:14:31.110Z',
            updatedAt: '2019-02-26T17:14:31.110Z',
            Article: {
              slug: 'my-first-jump-7wV8Wlvm',
              title: 'My First Jump',
              content: 'Sup',
              banner:
                'https://res.cloudinary.com/jesseinit/image/upload/v1550654610/article-images/memphis-colorful.png',
              timeToRead: 2,
              createdAt: '2019-02-21T00:57:22.454Z'
            }
          }
        ]
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
      <ReadStats {...props} />
    </MemoryRouter>
  </Provider>
);

test('<ReadStats />', () => {
  expect(wrapper).toMatchSnapshot();
});
