import React from 'react';
import { shallow } from 'enzyme';
import HorizontalArticleCard from './HorizontalArticleCard';

describe('<HorizontalArticleCard />', () => {
  const wrapper = shallow(<HorizontalArticleCard />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
