import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import HorizontalArticleCard from './HorizontalArticleCard';

describe('<HorizontalArticleCard />', () => {
  const wrapper = shallow(<HorizontalArticleCard />);
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<HorizontalArticleCard  />', () => {
  const props = {
    title: 'Hello',
    content: 'Hello',
    author: 'Jesse',
    createdAt: '2019-02-20 02:15:13.511263+01',
    timeToRead: 2,
    handleIconClick: jest.fn(() => {}),
    iconName: 'bookmark',
    slug: 'Hello',
    banner: 'https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/search.svg',
    isAuthenticated: true
  };
  const wrapper = mount(
    <MemoryRouter>
      <HorizontalArticleCard {...props} />
    </MemoryRouter>
  );
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate handling icon click', () => {
    const onClick = jest.fn();
    wrapper.setProps({ handleIconClick: onClick });
    wrapper.find('Icon.article-icon').simulate('click');
    expect(onClick.mock.calls.length).toEqual(0);
  });
});
