import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';
import NotificationBox from '../../Notification/Notification';
import { NotificationAction } from '../../../../action/notificationActions/notificationActions';
import pusher, { eventName } from '../../../../utils/pusherSetup';

export class LoggedInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotificationBox: false
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

  handleNotificationDisplay = () => {
    this.setState({
      showNotificationBox: true
    });
  };

  /* istanbul ignore next */
  onPageScroll = () => {
    this.setState({
      showNotificationBox: false
    });
  };

  render() {
    const { showNotificationBox } = this.state;
    const { notificationList } = this.props;
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
        <Image src="http://placekitten.com/g/30/30" avatar style={{ marginLeft: '10px', marginRight: '10px' }} />
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
  fetchNotifications: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  notificationList: state.notification.notificationList
});

const mapDispatchToProps = {
  fetchNotifications: NotificationAction.fetchNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeader);
