import React from 'react';
import { mount } from 'enzyme';
import { ConfirmationPage } from './ConfirmationPage';

jest.useFakeTimers();

const push = jest.fn();
const wrap = mount(<ConfirmationPage history={{ push }} />);

describe('<ConfirmationPage />', () => {
  it('renders the component successfully', () => {
    expect(wrap).toMatchSnapshot();
  });

  it('Test ComponentDidMount', () => {
    jest.runAllTimers();
    wrap.instance().componentDidMount();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 700);
    expect(push.mock.calls.length).toEqual(1);
  });
});
