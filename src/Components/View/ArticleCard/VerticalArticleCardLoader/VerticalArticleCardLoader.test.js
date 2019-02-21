import React from 'react';
import { shallow } from 'enzyme';

import VerticalArticleCardLoader from '../VerticalArticleCardLoader/VerticalArticleCardLoader';

describe('<VerticalArticleCardLoader />', () => {
  const wrapper = shallow(<VerticalArticleCardLoader />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
