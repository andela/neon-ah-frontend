import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import { NotificationAction } from '../../../action/notificationActions/notificationActions';

export const NotificationItem = ({ data, updateNotification }) => {
  const { id, message, createdAt, isRead } = data;
  const date = moment(createdAt)
    .startOf()
    .fromNow();

  return (
    <List.Item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          fontSize: '20px',
          color: isRead ? '#707175' : null
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            textAlign: 'left',
            fontSize: '18px',
            justifyContent: 'space-between'
          }}
        >
          <p style={{ fontSize: '16px' }}>{date}</p>
          <span id="checkbox-span" title="Mark as read" style={{ visibility: !isRead ? 'visible' : 'hidden' }}>
            <input onClick={() => updateNotification(id)} type="checkbox" />
          </span>
        </div>
        <h3 style={{ marginTop: '-15px' }}>{<a href={`/profile/${message.split(' ')[0]}`}>{message}</a>}</h3>
      </div>
    </List.Item>
  );
};

const mapDispatchToProps = {
  updateNotification: NotificationAction.updateNotification
};

NotificationItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    senderId: PropTypes.string,
    message: PropTypes.string,
    isRead: PropTypes.bool,
    receiverId: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  }).isRequired,
  updateNotification: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(NotificationItem);
