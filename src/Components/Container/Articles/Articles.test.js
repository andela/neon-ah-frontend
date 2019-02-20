import React from 'react';
import { shallow } from 'enzyme';
import Articles from './Articles';

const wrapper = shallow(<Articles />);

describe('<Articles />', () => {
  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
