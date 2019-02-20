import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CreateArticle, { CreateArticle as CreateArticleUnit } from './CreateArticle';

const mockStore = configureMockStore([thunk]);

describe('<CreateArticle />', () => {
  let wrapper;

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
      <MemoryRouter>
        <>
          <CreateArticleUnit {...props} />
        </>
      </MemoryRouter>
    );
    wrapper.find('.article-title').simulate('change', { target: { value: 'some title' } });
    expect(wrapper.find(CreateArticleUnit).state('articleTitle')).toEqual('some title');
  });

  test('should should submit entries to the action creator', () => {
    wrapper = mount(
      <MemoryRouter>
        <>
          <CreateArticleUnit {...props} />
        </>
      </MemoryRouter>
    );
    wrapper
      .find('#submitArticle')
      .at(0)
      .simulate('click');
    expect(props.createArticle).toBeCalled();
  });
});
