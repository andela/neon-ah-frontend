import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound/NotFound';

describe('<NotFound />', () => {
  const wrapper = shallow(<NotFound />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
