import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import SearchFunctionalityTab from './SearchFunctionalityTab';

describe('<AuthorCard  />', () => {
  const props = {
    data: {
      articles: {
        rows: [
          {
            author: ''
          }
        ]
      },
      authors: {
        rows: [{}]
      },
      tags: {
        rows: [
          {
            id: 1,
            name: 'Science'
          }
        ]
      }
    },
    handleIconClick: jest.fn(),
    isAuthenticated: true,
    bookmarks: [],
    following: [],
    handleFollowButtonSubmit: jest.fn()
  };
  const store = {
    getState: () => {
      return {
        sendEmailReducer: {
          isEmailSent: false
        },
        signUpReducer: {
          isLoading: false,
          signUpCompleted: false,
          hasSignUpError: false,
          signUpError: null,
          message: null
        },
        searchFunctionalityReducer: {
          statusCode: 200,
          articleTagOrAuthorDatas: [],
          bookmarks: [],
          isBookmark: 'bookmark',
          following: []
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
        <SearchFunctionalityTab {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  //   it('should simulate handling button click', () => {
  //     const onClick = jest.fn();
  //     wrapper.setProps({ handleFollowButtonSubmit: onClick });
  //     wrapper.find('button.upload-btn').simulate('click');
  //     expect(onClick.mock.calls.length).toEqual(0);
  //   });
});
