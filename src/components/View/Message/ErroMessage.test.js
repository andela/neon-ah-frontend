import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage />', () => {
  const wrapper = shallow(<ErrorMessage />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
