import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AuthorCard from './AuthorCard';

describe('<AuthorCard  />', () => {
  const props = {
    image: 'https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/search.svg',
    fullName: 'jesse',
    isFollowing: 'follow',
    userName: 'jesseinit',
    handleFollowButtonSubmit: jest.fn(() => {}),
    isAuthenticated: true
  };
  const wrapper = mount(
    <MemoryRouter>
      <AuthorCard {...props} />
    </MemoryRouter>
  );

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate handling button click', () => {
    const onClick = jest.fn();
    wrapper.setProps({ handleFollowButtonSubmit: onClick });
    wrapper.find('button.upload-btn').simulate('click');
    expect(onClick.mock.calls.length).toEqual(0);
  });
});
