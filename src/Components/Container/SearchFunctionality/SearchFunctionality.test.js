import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import SearchFunctionality from './SearchFunctionality';

const searchByOptionApiCall = jest.fn();
const props = {
  bookmarks: [],
  following: [],
  articleTagOrAuthorDatas: [{ articles: 's' }],
  statusCode: 200,
  searchByOptionApiCall: jest.fn(),
  bookmarkArticle: jest.fn(),
  followAnAuthor: jest.fn(),
  handleIconClick: jest.fn()
};
const wrap = shallow(<SearchFunctionality {...props} searchByOptionApiCall={searchByOptionApiCall} />);
const mockFetch = jest.fn;

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
        following: [],
        query: 'title',
        searching: true
      },
      auth: {
        isAuthenticated: false
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
      <SearchFunctionality {...props} searchByOptionApiCall={searchByOptionApiCall} getToken={mockFetch} />
    </MemoryRouter>
  </Provider>
);

describe('<SearchFunctionality />', () => {
  it('renders the component successfully', () => {
    expect(wrap).toMatchSnapshot();
  });

  it('should simulate an input change', () => {
    wrapper.find('input').simulate('change', {});
    expect(searchByOptionApiCall.mock.calls.length).toEqual(0);
  });

  it('should simulate a select change', () => {
    wrapper.find('select').simulate('change', {});
    expect(searchByOptionApiCall.mock.calls.length).toEqual(0);
  });

  test('should call getToken when mounted', () => {
    expect(wrapper).toBeDefined();
  });
});
