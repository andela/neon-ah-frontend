import React from 'react';
import { shallow } from 'enzyme';
import HorizontalArticleCardLoader from '../HorizontalArticleCardLoader/HorizontalArticleLoader';

describe('<HorizontalArticleCardLoader />', () => {
  const wrapper = shallow(<HorizontalArticleCardLoader />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
