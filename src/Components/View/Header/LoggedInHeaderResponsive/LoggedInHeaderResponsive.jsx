/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { NotificationAction } from '../../../../action/notificationActions/notificationActions';
import NotificationBox from '../../Notification/Notification';
import pusher, { eventName } from '../../../../utils/pusherSetup';
import * as profileAction from '../../../../action/profileActions/profileActions';

export class LoggedInHeaderResponsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNotificationBox: false
    };
    this.handleNotificationBoxToggle = this.handleNotificationBoxToggle.bind(this);
    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  async componentDidMount() {
    const { fetchNotifications, getUserDataById } = this.props;
    fetchNotifications();
    const channel = pusher.subscribe('notification');
    channel.bind(eventName, () => {
      /* istanbul ignore next */
      fetchNotifications();
    });
    await getUserDataById();
  }

  handleNotificationBoxToggle() {
    this.setState({
      openNotificationBox: true
    });
  }

  /* istanbul ignore next */
  handlePageScroll(evt) {
    evt.preventDefault();
    this.setState({
      openNotificationBox: false
    });
  }

  render() {
    const { openNotificationBox } = this.state;
    const { notificationList, loggedInUserData } = this.props;
    document.onscroll = this.handlePageScroll;

    return (
      <>
        <div className="hamburger">
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item text={<Link to="/search">Search</Link>} />
              <Dropdown.Item text={<Link to="/articles/new">Write Article</Link>} />
              <Dropdown.Item
                id="notification-dropdown"
                onClick={this.handleNotificationBoxToggle}
                text="Notification"
                style={{ color: '#4183c4' }}
              />
              <Dropdown.Item text={<Link to={`/profile/${loggedInUserData.userName}`}>Profile</Link>} />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <NotificationBox
          onClose={this.handlePageScroll}
          open={openNotificationBox}
          notificationList={notificationList}
        />
      </>
    );
  }
}

LoggedInHeaderResponsive.propTypes = {
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
  loggedInUserData: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export const mapStateToProps = state => {
  const {
    profileReducer: { isLoading, data, error, isSelf, loggedInUserData },
    notification: { notificationList }
  } = state;
  return {
    loggedInUserData,
    isLoading,
    data,
    error,
    isSelf,
    notificationList
  };
};

const mapDispatchToProps = {
  fetchNotifications: NotificationAction.fetchNotifications,
  getUserDataById: profileAction.fetchUserProfileById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeaderResponsive);
