import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { LoggedInHeaderSearch } from './LoggedInHeaderSearch';
import { mapStateToProps } from './LoggedInHeaderSearch';

describe('<LoggedInHeaderSearch />', () => {
  const props = {
    searchOption: jest.fn(),
    handleSearchChange: jest.fn(),
    sendSearchInputValue: jest.fn(),
    isLoading: true,
    value: 's',
    articleTagOrAuthorDatas: {
      articles: {
        rows: [{}, {}]
      },
      tags: {
        rows: [{}, {}]
      },
      authors: {
        rows: [{}, {}]
      }
    }
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
          articleTagOrAuthorDatas: {
            articles: [{}],
            tags: [{}],
            authors: [{}]
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
        <>
          <LoggedInHeaderSearch {...props} />)
        </>
      </MemoryRouter>
    </Provider>
  );
  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should test mapStateToProps function', () => {
    const state = {
      searchFunctionalityReducer: { articleTagOrAuthorDatas: [] }
    };
    const result = {
      articleTagOrAuthorDatas: []
    };
    expect(mapStateToProps(state)).toEqual(result);
  });
});
