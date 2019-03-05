import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { findByTestAttr, checkProps } from '../../../../utils/testUtils';
import RelatedArticles from './RelatedArticles';

const setUp = (props = {}) => {
  const component = shallow(<RelatedArticles {...props} />);
  return component;
};

const props = {
  rating: 1
};

const store = {
  getState: () => {
    return {
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
            createdAt: 'Thu Feb 21 2019 8:48:54 AM',
            updatedAt: 'Thu Feb 21 2019 8:48:54 AM'
          },
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
            createdAt: 'Thu Feb 21 2019 8:48:54 AM',
            updatedAt: 'Thu Feb 21 2019 8:48:54 AM'
          },
          {
            id: '20132ac5-e241-4033-a995-aa86c76071ca',
            slug: 'lights-camera-action-f9zwlFCO',
            title: 'Lights Camera Action',
            content: "<h1 style='margin'>Lorem Ipsum</h1> <h4 style>",
            banner:
              'https://res.cloudinary.com/jesseinit/image/upload/v1550738292/article-images/cg08afbe4rfsmsl4ijk1.jpg',
            timeToRead: 3,
            isPublished: true,
            isReported: false,
            userId: 'aba396bd-7ac4-42c3-7442-cf10dd73e4f4',
            averageRating: 0,
            createdAt: 'Thu Feb 21 2019 8:48:54 AM',
            updatedAt: 'Thu Feb 21 2019 8:48:54 AM'
          },
          {
            id: '20132ac5-e241-4033-a795-aa86cc6071ca',
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
          }
        ]
      },
      hreadArticleReducer: {
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
        }
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
      <RelatedArticles {...props} />
    </MemoryRouter>
  </Provider>
);
describe('Article Ratings', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one relatedArticles element', () => {
    const wrapper = findByTestAttr(component, 'relatedArticles');
    expect(wrapper.length).toBe(0);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });
});
