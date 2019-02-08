import React from 'react';
import { shallow } from 'enzyme';
import MakeHeaderResponsive from './MakeHeaderResponsive';

describe('<MakeHeaderResponsive />', () => {
  const wrapper = shallow(<MakeHeaderResponsive />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
