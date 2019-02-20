import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ProfileSettingsTab from '../../Container/ProfileSettingsTab/ProfileSettingsTab';

const Tabs = ({ userInfo, self, history }) => {
  const panes = [
    { menuItem: 'Articles', render: () => <Tab.Pane attached={false}>Article</Tab.Pane> },
    { menuItem: 'Bookmarks', render: () => <Tab.Pane attached={false}>Bookmarks</Tab.Pane> },
    { menuItem: 'Likes', render: () => <Tab.Pane attached={false}>Likes</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane attached={false}>Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane attached={false}>Following</Tab.Pane> }
  ];

  if (self) {
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
