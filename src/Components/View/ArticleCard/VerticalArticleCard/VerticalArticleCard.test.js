import React from 'react';
import { shallow } from 'enzyme';
import VerticalArticleCard from './VerticalArticleCard';

describe('<VerticalArticleCard />', () => {
  const wrapper = shallow(<VerticalArticleCard />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
