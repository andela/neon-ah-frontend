import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { findByTestAttr, checkProps } from '../../../utils/testUtils';
import Bookmarks from './Bookmarks';

const setUp = (props = {}) => {
  const component = shallow(<Bookmarks {...props} />);
  return component;
};
const props = {
  bookmarks: [
    {
      userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
      articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
      createdAt: '2019-03-03T03:28:49.424Z',
      updatedAt: '2019-03-03T03:28:49.424Z',
      Article: {
        slug: 'my-first-jump-7wV8Wlvm',
        title: 'My First Jump',
        content:
          "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
      }
    },

    {
      userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
      articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
      createdAt: '2019-03-03T03:28:49.424Z',
      updatedAt: '2019-03-03T03:28:49.424Z',
      Article: {
        slug: 'my-second-jump-7wV8Wlvm',
        title: 'My second Jump',
        content:
          "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
      }
    }
  ],
  isLoading: false
};
const store = {
  getState: () => {
    return {
      getUserBookmarks: {
        bookmarks: [
          {
            userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
            articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
            createdAt: '2019-03-03T03:28:49.424Z',
            updatedAt: '2019-03-03T03:28:49.424Z',
            Article: {
              slug: 'my-first-jump-7wV8Wlvm',
              title: 'My First Jump',
              content:
                "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
            }
          },

          {
            userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
            articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
            createdAt: '2019-03-03T03:28:49.424Z',
            updatedAt: '2019-03-03T03:28:49.424Z',
            Article: {
              slug: 'my-second-jump-7wV8Wlvm',
              title: 'My second Jump',
              content:
                "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
            }
          }
        ],
        isLoading: false,
        response: {}
      },
      rateArticleReducer: {
        rating: 0,
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
      <Bookmarks {...props} />
    </MemoryRouter>
  </Provider>
);

describe('Bookmark"', () => {
  describe('General rendering', () => {
    let component;
    // const app = mount(<NamedBookmarks />);
    beforeEach(() => {
      component = setUp();
    });
    it('Should render no Bookmarks element when no slug is sent', () => {
      const wrapper = findByTestAttr(component, 'Bookmarks');
      expect(wrapper.length).toBe(0);
    });
    it('Should render successfully', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('Testing PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        bookmarks: [
            {
              userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
              articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
              createdAt: '2019-03-03T03:28:49.424Z',
              updatedAt: '2019-03-03T03:28:49.424Z',
              Article: {
                slug: 'my-first-jump-7wV8Wlvm',
                title: 'My First Jump',
                content:
                  "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
              }
            },
  
            {
              userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
              articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
              createdAt: '2019-03-03T03:28:49.424Z',
              updatedAt: '2019-03-03T03:28:49.424Z',
              Article: {
                slug: 'my-second-jump-7wV8Wlvm',
                title: 'My second Jump',
                content:
                  "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
              }
            }
          ],
          isLoading: false,
          response: {}
      };
      const propsErr = checkProps(Bookmarks, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have Props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        bookmarks: [
            {
              userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
              articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
              createdAt: '2019-03-03T03:28:49.424Z',
              updatedAt: '2019-03-03T03:28:49.424Z',
              Article: {
                slug: 'my-first-jump-7wV8Wlvm',
                title: 'My First Jump',
                content:
                  "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
              }
            },
  
            {
              userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
              articleId: '12f2b9a5-9c62-4ebb-8833-442aa365c74e',
              createdAt: '2019-03-03T03:28:49.424Z',
              updatedAt: '2019-03-03T03:28:49.424Z',
              Article: {
                slug: 'my-second-jump-7wV8Wlvm',
                title: 'My second Jump',
                content:
                  "<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: 'Open Sans', Arial, san"
              }
            }
          ],
          isLoading: false,
          response: {}
      };
      wrapper = setUp(props);
    });
    it('Should render successfully', () => {
      const component = findByTestAttr(wrapper, 'Bookmarks');
      expect(component.length).toBe(0);
    });
  });
  describe('Have No Props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it('Should render for optional props', () => {
      const component = findByTestAttr(wrapper, 'Bookmarks');
      expect(component.length).toBe(0);
    });
  });
});
