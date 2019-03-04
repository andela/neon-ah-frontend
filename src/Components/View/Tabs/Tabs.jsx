import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ProfileSettingsTab from '../../Container/ProfileSettingsTab/ProfileSettingsTab';
import ReadStats from '../../Container/ReadStats/ReadStats';
import MyArticles from '../ArticlesTab/ArticlesTab';
import Bookmarks from '../../Container/Bookmarks/Bookmarks';
import Followers from '../Followers/Followers';
import Following from '../Following/Following';

const Tabs = ({ userInfo, self, history }) => {
  const panes = [
    {
      menuItem: 'Articles',
      render: () => (
        <Tab.Pane attached={false}>
          <MyArticles articles={userInfo.articles} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Bookmarks',
      render: () => (
        <Tab.Pane attached={false}>
          <Bookmarks />
        </Tab.Pane>
      )
    },

    {
      menuItem: 'Followers',
      render: () => (
        <Tab.Pane attached={false}>
          <Followers />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Following',
      render: () => (
        <Tab.Pane attached={false}>
          <Following />
        </Tab.Pane>
      )
    }
  ];

  if (self) {
    panes.push({
      menuItem: 'Stats',
      render: () => (
        <Tab.Pane attached={false}>
          <ReadStats />
        </Tab.Pane>
      )
    });
    panes.push({
      menuItem: 'Profile Settings',
      render: props => (
        <Tab.Pane attached={false}>
          <ProfileSettingsTab userDetails={props.menu.data} history={history} />
        </Tab.Pane>
      )
    });
  }

  return (
    <Tab
      className="tabs-menu"
      menu={{ secondary: true, pointing: true, data: { ...userInfo }, self, history }}
      panes={panes}
    />
  );
};

Tabs.propTypes = {
  userInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  self: PropTypes.bool.isRequired
};

export default Tabs;
