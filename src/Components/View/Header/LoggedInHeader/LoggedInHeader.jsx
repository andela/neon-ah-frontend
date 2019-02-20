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

export class LoggedInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationBox: false,
      showDropdown: false
    };
  }

  componentDidMount() {
    const { fetchNotifications, getUserDataById } = this.props;
    getUserDataById();
    fetchNotifications();
    const channel = pusher.subscribe('notification');
    channel.bind(eventName, () => {
      /* istanbul ignore next */
      fetchNotifications();
    });
  }

  handleNotificationDisplay = () => {
    const { showNotificationBox } = this.state;
    this.setState({
      showNotificationBox: !showNotificationBox
    });
  };

  /* istanbul ignore next */
  onPageScroll = () => {
    this.setState({
      showNotificationBox: false
    });
  };

  handleImageClick = () => {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  };

  render() {
    const { showNotificationBox, showDropdown } = this.state;
    const { notificationList, loggedInUserData } = this.props;
    document.onscroll = this.onPageScroll;

    return (
      <div className="landingPage__mobile">
        <Link to="/search" style={{ marginRight: '10px' }}>
          <Icon link name="search" />
        </Link>
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
          style={{ marginLeft: '10px', position: 'relative', cursor: 'pointer' }}
        >
          {/* istanbul ignore next */ notificationList.filter(message => message.isRead === false).length > 0 && (
            <Icon name="circle" size="tiny" style={{ position: 'absolute', top: '0px', left: '13px', color: 'red' }} />
          )}
          <NotificationBox onClose={this.onPageScroll} open={showNotificationBox} notificationList={notificationList} />
        </Icon>
        <div className="image">
          <Image
            src={
              loggedInUserData.img
                ? loggedInUserData.img
                : 'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
            }
            avatar
            style={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
            className="profile-img"
            onClick={this.handleImageClick}
          />
          <ImageDropdown userinfo={loggedInUserData} open={showDropdown} />
        </div>
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
  })
};

LoggedInHeader.defaultProps = {
  loggedInUserData: {}
};

export const mapStateToProps = state => ({
  notificationList: state.notification.notificationList,
  loggedInUserData: state.profileReducer.loggedInUserData
});

const mapDispatchToProps = {
  fetchNotifications: NotificationAction.fetchNotifications,
  getUserDataById: profileAction.fetchUserProfileById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeader);

// {
//   Object.keys(loggedInUserData.length > 0) ? (
//     <div className="image">
//       <Image
//         src={
//           loggedInUserData.img
//             ? loggedInUserData.img
//             : 'https://res.cloudinary.com/jesseinit/image/upload/v1550502499/neon-ah/user.svg'
//         }
//         avatar
//         style={ { marginLeft: '10px', marginRight: '10px', cursor: 'pointer' } }
//         className="profile-img"
//         onClick={ this.handleImageClick }
//       />
//       <ImageDropdown userinfo={ loggedInUserData } open={ showDropdown } />
//     </div>
//   ) : null
// }
