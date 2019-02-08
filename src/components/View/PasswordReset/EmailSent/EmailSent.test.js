import React from 'react';
import { shallow } from 'enzyme';
import EmailSent from './EmailSent';

describe('<EmailSent />', () => {
  const wrapper = shallow(<EmailSent />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
