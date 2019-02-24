import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreateArticle, { CreateArticle as CreateArticleUnit } from './CreateArticle';

const mockStore = configureMockStore([thunk]);

describe('<CreateArticle />', () => {
  let wrapper;
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
        },
        notification: {
          isLoading: false,
          notificationList: [],
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

  const props = {
    createArticle: jest.fn(),
    article: {
      isCreating: false,
      articleErrors: ['Sample Error']
    },
    history: {}
  };

  test('should render succesfully', () => {
    wrapper = shallow(<CreateArticle />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should set title onChange to the state', () => {
    wrapper = mount(
      <Provider store={store}>
      <MemoryRouter>
        <>
          <CreateArticleUnit {...props} />
        </>
      </MemoryRouter>
      </Provider>
    );
    wrapper.find('.article-title').simulate('change', { target: { value: 'some title' } });
    expect(wrapper.find(CreateArticleUnit).state('articleTitle')).toEqual('some title');
  });

  test('should should submit entries to the action creator', () => {
    wrapper = mount(
      <Provider store={store}>
      <MemoryRouter>
        <>
          <CreateArticleUnit {...props} />
        </>
      </MemoryRouter>
      </Provider>

    );
    wrapper
      .find('#submitArticle')
      .at(0)
      .simulate('click');
    expect(props.createArticle).toBeCalled();
  });
});
