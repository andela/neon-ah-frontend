import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
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
  const store = {
    getState: () => {
      return {
        auth: { isAuthenticated: false },
        tagsReducer: {
          tags: [
            {
              id: '5e722316-bcee-43e4-8ce4-813d1c9f8f4d',
              name: 'stating out',
              createdAt: '2019-02-20 02:15:13.466076+01',
              updatedAt: '2019-02-20 02:15:13.466076+01'
            }
          ]
        },
        homePageArticlesReducer: {
          articles: [
            {
              id: '20132ac5-e241-4033-a995-aa86cc6071ca',
              slug: 'lights-camera-action-f9zwlFCO',
              title: 'Lights Camera Action',
              content: "<h1 style='margin'>Lorem Ipsum</h1> <h4 style>",
              banner:
                'https://res.cloudinary.com/jesseinit/image/upload/v1550738292/article-images/cg08afbe4rfsmsl4ijk1.jpg',
              timeToRead: 3,
              isPublished: true,
              isReported: false,
              userId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
              averageRating: 0,
              createdAt: '2019-02-20 02:15:13.466076+01',
              updatedAt: '2019-02-20 02:15:13.466076+01',
              author: {
                userName: 'kabir',
                bio: 'Learning life now',
                img: null,
                fullName: 'Kabir Alausa'
              },
              tags: ['lights', 'actions', 'camera'],
              comments: [],
              message: '',

              response: {}
            }
          ]
        },
        signUpReducer: {
          isLoading: false,
          signUpCompleted: false,
          hasSignUpError: false,
          signUpError: null,
          message: null
        }
      };
    },
    subscribe: () => {
      return store.getState();
    },
    dispatch: () => {}
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <HorizontalArticleCard {...props} />
      </MemoryRouter>
    </Provider>
  );
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate handling icon click', () => {
    const onClick = jest.fn();
    wrapper.setProps({ handleIconClick: onClick });
    wrapper.find('i.article-icon').simulate('click');
    expect(onClick.mock.calls.length).toEqual(0);
  });
});
