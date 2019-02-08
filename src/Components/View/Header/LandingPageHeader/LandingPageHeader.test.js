import React from 'react';
import { shallow } from 'enzyme';
import LandingPageHeader from './LandingPageHeader';

const wrapper = shallow(<LandingPageHeader />);

describe('<LandingPageHeader />', () => {
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a div tag with className of landingPage__mobile', () => {
    expect(wrapper.find('.landingPage__mobile').length).toEqual(1);
  });

  it('should have three Navigation Links', () => {
    expect(wrapper.find('Link').length).toEqual(1);
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
