import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import './Notification.scss';

const Notification = ({ notificationList, onClose, open }) => {
  notificationList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });
  const notificationMessages = notificationList
    .reverse()
    .map(notification => <NotificationItem key={notification.id} data={notification} />);

  return (
    <div className="animate notification-box" style={{ display: open ? 'block' : 'none' }}>
      {notificationList.length < 1 ? (
        <div
          style={{
            display: 'flex',
            padding: 'auto',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            textAlign: 'left',
            fontSize: '18px',
            height: '20px',
            justifyContent: 'space-between'
          }}
        >
          <h3>You have no notifications yet</h3>
          <Icon id="close-icon" onClick={onClose} name="close" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              padding: '5px 10px 0px 10px',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              textAlign: 'left',
              fontSize: '18px',
              marginBottom: '-30px',
              justifyContent: 'space-between'
            }}
          >
            <h2>Notifications</h2>
            <Icon id="close-icon" onClick={onClose} name="close" />
          </div>
          <List animated celled>
            {notificationMessages}
          </List>
        </>
      )}
    </div>
  );
};

Notification.propTypes = {
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
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Notification;
