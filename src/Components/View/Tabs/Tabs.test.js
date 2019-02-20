import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './Tabs';

describe('<Tabs/>', () => {
  const userInfo = {
    userName: 'samuel',
    fullName: 'Samuel Adeniran',
    bio: 'Writer',
    getInAppNotification: true,
    getEmailsnotification: true,
    imageUrl: 'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
  };
  const wrapper = shallow(<Tabs userInfo={userInfo} self />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
