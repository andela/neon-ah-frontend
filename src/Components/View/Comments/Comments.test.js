import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../utils/testUtils';
import { Comments } from './Comments';

const setUp = (props = {}) => {
  const component = shallow(<Comments {...props} />);
  return component;
};

const addComment = jest.fn();
const preventDefault = jest.fn();
const wrap = shallow(<Comments addComment={addComment} isAuthenticated location={{ pathname: 'hello' }} />)

describe('Comments Banner', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render one comments element', () => {
    const wrapper = findByTestAttr(component, 'comments');
    expect(wrapper.length).toBe(1);
  });
  it('Should render successfully', () => {
    expect(component).toMatchSnapshot();
  });

  it('should update the state when input fields change', () => {
    wrap.find('#content').simulate('change', {
      preventDefault,
      target: { value: 'hello', id: 'content' }
    });

    expect(wrap.state('inputFieldsData').content).toEqual('hello');
  });

  it('should simulate click event on the submit button', () => {
    wrap.setState({ inputFieldsData: { content: '  ' } });
    wrap.find('#comment-form').simulate('submit', {
      preventDefault
    });

    expect(wrap.state('hasValidationError')).toEqual(true);
  });

  it('should submit for if input are valid', () => {
    wrap.setState({
        hasValidationError: false,
        inputFieldsData: {
          content: 'Hello'
      }
    });
    wrap.find('#comment-form').simulate('submit', {
      preventDefault
    });

    expect(addComment.mock.calls.length).toEqual(1);
  });
});
