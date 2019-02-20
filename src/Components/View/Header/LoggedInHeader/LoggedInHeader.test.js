import React from 'react';
import { shallow } from 'enzyme';
import LoggedInHeader from './LoggedInHeader';

const wrapper = shallow(<LoggedInHeader />);

describe('<LoggedInHeader />', () => {
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a div tag with className of landingPage__mobile', () => {
    expect(wrapper.find('.landingPage__mobile').length).toEqual(1);
  });

  it('should  contain a search link', () => {
    expect(
      wrapper

        .find('Link')
        .first()
        .prop('to')
    ).toEqual('/search');
  });
});
