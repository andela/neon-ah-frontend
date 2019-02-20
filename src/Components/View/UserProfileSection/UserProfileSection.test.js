import React from 'react';
import { shallow } from 'enzyme';
import UserProfileSection from './UserProfileSection';

describe('<UserProfileSection/>', () => {
  const userInfo = {
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

  const wrapper = shallow(<UserProfileSection userInfo={userInfo} self />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
