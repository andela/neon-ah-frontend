import React from 'react';
import { shallow } from 'enzyme';
import CustomDropdown from './CustomDropdown';

describe('<CustomDropdown/>', () => {
  const userinfo = {
    userName: 'samuel',
    fullName: 'Samuel Adeniran',
    bio: 'Writer',
    getInAppNotification: true,
    getEmailsnotification: true,
    imageUrl: 'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg',
    articles: 0,
    followers: 0,
    following: 0
  };

  const open = true;
  const logOutUser = jest.fn();
  history = [];

  const wrapper = shallow(<CustomDropdown userinfo={userinfo} open={open} logOutUser={logOutUser} history={history} />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
