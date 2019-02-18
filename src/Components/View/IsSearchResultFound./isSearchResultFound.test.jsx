import { shallow } from 'enzyme';
import React from 'react';
import IsSearchResultFound from './IsSearchResultFound';

describe('<IsSearchResultFound  />', () => {
  const wrapper = shallow(<IsSearchResultFound isDataFound />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
