import React from 'react';
import { shallow } from 'enzyme';
import LandingPage, { mapStateToProps } from './LandingPage';

const wrapper = shallow(<LandingPage />);

describe('<App />', () => {
  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('mapStateToProps should return the right value', () => {
    const mockedState = {
      auth: { loginErrors: '' }
    };
    const state = mapStateToProps(mockedState);
    expect(state).toEqual({ socialLoginErrors: '' });
  });
});
