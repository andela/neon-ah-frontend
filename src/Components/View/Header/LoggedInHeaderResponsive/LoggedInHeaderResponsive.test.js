import React from 'react';
import { shallow } from 'enzyme';
import LoggedInHeaderResponsive from './LoggedInHeaderResponsive';

describe('<LoggedInHeaderResponsive />', () => {
  const wrapper = shallow(<LoggedInHeaderResponsive />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
