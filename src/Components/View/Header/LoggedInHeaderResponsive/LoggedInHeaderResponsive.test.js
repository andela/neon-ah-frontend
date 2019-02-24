import React from 'react';
import { shallow } from 'enzyme';
import { LoggedInHeaderResponsive, mapStateToProps } from './LoggedInHeaderResponsive';

describe('<LoggedInHeaderResponsive />', () => {
  const fetchNotifications = jest.fn();
  const notificationList = [{}]
  const wrapper = shallow(<LoggedInHeaderResponsive fetchNotifications={fetchNotifications} notificationList={notificationList} />);

  it('should render succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate onClick Event on the Notification bell', () => {
    wrapper.find('#notification-dropdown').simulate('click');
    expect(wrapper.state('openNotificationBox')).toEqual(true)
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
