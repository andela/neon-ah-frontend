import React from 'react';
import { shallow } from 'enzyme';
import { LoggedInHeader, mapStateToProps } from './LoggedInHeader';

const fetchNotifications = jest.fn();
const notificationList = [{}]

const wrapper = shallow(<LoggedInHeader fetchNotifications={fetchNotifications} notificationList={notificationList} />);

describe('<LoggedInHeader />', () => {
  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate onClick Event on the Notification bell', () => {
    wrapper.find('#notification-icon').simulate('click');
    expect(wrapper.state('showNotificationBox')).toEqual(true)
  });

  it('should call the fetchNotifications function', () => {
    wrapper.instance().componentDidMount();
    expect(fetchNotifications.mock.calls.length).toBeGreaterThan(0);
  });

  it('should test mapStateToProps function', () => {
    const state = {
      notification: { notificationList: [] }
    };
    const result = {
      notificationList: []
    }
    expect(mapStateToProps(state)).toEqual(result);
  });
});
