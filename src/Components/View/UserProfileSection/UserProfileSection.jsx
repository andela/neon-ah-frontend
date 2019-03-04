import React, { Component } from 'react';
import { Item, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class UserProfileSection extends Component {
  state = {};

  render() {
    const { userInfo, self } = this.props;
    return (
      <div className="user-profile">
        <Item.Group>
          <Item className="profile-section">
            <Item.Image
              size="small"
              circular
              src={
                userInfo.img
                  ? userInfo.img
                  : 'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
              }
            />
            <Item.Content>
              <Item.Header className="profile-header">
                {userInfo.fullName}
                <span>
                  {self ? (
                    <Button size="mini" className="follow-button-user">
                      Follow
                    </Button>
                  ) : (
                    <Button size="mini" className="follow-button">
                      Follow
                    </Button>
                  )}
                </span>
              </Item.Header>
              <Item.Description className="profile-description">
                <p>{userInfo.bio ? userInfo.bio : 'Best Selling Author'}</p>
                <div className="user-stats">
                  <div>
                    <p>Following</p>
                    <p>{userInfo.following.length}</p>
                  </div>

                  <div>
                    <p>Followers</p>
                    <p>{userInfo.followers.length}</p>
                  </div>

                  <div>
                    <p>Articles Written</p>
                    <p>{userInfo.articles.length}</p>
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}

UserProfileSection.propTypes = {
  userInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  self: PropTypes.bool.isRequired
};

export default UserProfileSection;
