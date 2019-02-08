import React from 'react';
import { shallow } from 'enzyme';
import SuccessMessage from './SuccessMessage';

describe('<SuccessMessage />', () => {
  const wrapper = shallow(<SuccessMessage />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
