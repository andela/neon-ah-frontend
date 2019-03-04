import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';
import ImageDropdown from '../../CustomDropdown/CustomDropdown';
import NotificationBox from '../../Notification/Notification';
import { NotificationAction } from '../../../../action/notificationActions/notificationActions';
import pusher, { eventName } from '../../../../utils/pusherSetup';
import * as profileAction from '../../../../action/profileActions/profileActions';
import authentication from '../../../../utils/auth/authentication';
import decodeToken from '../../../../utils/auth/jwtDecode';
import LoggedInHeaderSearch from '../../SearchFunctionality/LoggedInHeaderSearch/LoggedInHeaderSearch';

export class LoggedInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationBox: false,
      showDropdown: false,
      searchIconClick: false
    };
  }

  componentDidMount() {
    const { fetchNotifications } = this.props;
    fetchNotifications();
    const channel = pusher.subscribe('notification');
    channel.bind(eventName, () => {
      /* istanbul ignore next */
      fetchNotifications();
    });
  }

  handleSearchIconClick = () => {
    const { searchIconClick } = this.state;
    this.setState({
      searchIconClick: !searchIconClick
    });
  };

  handleNotificationDisplay = () => {
    const { showNotificationBox } = this.state;
    this.setState({
      showNotificationBox: !showNotificationBox,
      showDropdown: false
    });
  };

  /* istanbul ignore next */
  onPageScroll = () => {
    this.setState({
      showNotificationBox: false,
      showDropdown: false
    });
  };

  handleProfileImageClick = () => {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown,
      showNotificationBox: false
    });
  };

  render() {
    const { showNotificationBox, showDropdown, searchIconClick } = this.state;
    const { notificationList, loggedInUserData } = this.props;
    document.onscroll = this.onPageScroll;
    const token = authentication.getUserToken();
    const decode = decodeToken(token);
    const { img: imageInToken, userName: userNameInToken } = decode;

    return (
      <div className="landingPage__mobile">
        <div>
          {searchIconClick ? (
            <>
              <div id="display-search-flex">
                <div>
                  <Icon
                    link
                    name="search"
                    style={{ marginRight: '10px', marginTop: '6px' }}
                    onClick={this.handleSearchIconClick}
                  />
                </div>
                <div>
                  <LoggedInHeaderSearch style={{ marginRight: '10px' }} />
                </div>
              </div>
            </>
          ) : (
            <Icon
              link
              name="search"
              style={{ marginRight: '10px', marginTop: '6px' }}
              onClick={this.handleSearchIconClick}
            />
          )}
        </div>
        <Link to="/article/new">
          <Button
            content="Write an article"
            style={{ backgroundColor: '#2fb5ee', color: '#fff', marginRight: '10px' }}
          />
        </Link>

        <Icon
          id="notification-icon"
          onClick={this.handleNotificationDisplay}
          name="bell outline"
          size="large"
          style={{ marginLeft: '10px', marginTop: '6px', position: 'relative', cursor: 'pointer' }}
        >
          {/* istanbul ignore next */ notificationList.filter(message => message.isRead === false).length > 0 && (
            <Icon name="circle" size="tiny" style={{ position: 'absolute', top: '0px', left: '13px', color: 'red' }} />
          )}
        </Icon>
        <div className="image">
          <Image
            src={loggedInUserData.img || imageInToken}
            avatar
            style={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
            className="profile-img"
            onClick={this.handleProfileImageClick}
          />
          <ImageDropdown
            userName={loggedInUserData.userName ? loggedInUserData.userName : userNameInToken}
            open={showDropdown}
          />
        </div>
        <NotificationBox onClose={this.onPageScroll} open={showNotificationBox} notificationList={notificationList} />
      </div>
    );
  }
}

LoggedInHeader.propTypes = {
  notificationList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      senderId: PropTypes.string,
      message: PropTypes.string,
      isRead: PropTypes.bool,
      receiverId: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    })
  ).isRequired,
  fetchNotifications: PropTypes.func.isRequired,
  loggedInUserData: PropTypes.shape({
    bio: 'NY Times Best Selling Author',
    email: 'samuel.adeniran@andela.com',
    fullName: 'Samuel Adeniran',
    getEmailsNotification: true,
    getInAppNotification: true,
    id: '6211521f-5baf-403e-9d66-04103240a5c2',
    img: 'https://res.cloudinary.com/jesseinit/image/upload/v1551087507/article-images/tttkavt3wkrffezc7cf5.jpg',
    userName: 'sam',
    articles: [],
    following: [],
    followers: []
  }),
  getUserDataById: PropTypes.func.isRequired
};

LoggedInHeader.defaultProps = {
  loggedInUserData: {}
};

export const mapStateToProps = state => ({
  notificationList: state.notification.notificationList,
  loggedInUserData: state.profileReducer.loggedInUserData
});

const mapDispatchToProps = {
  fetchNotifications: NotificationAction.fetchNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeader);
