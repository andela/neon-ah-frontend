import React from 'react';
import { shallow } from 'enzyme';
import { NotificationItem } from "./NotificationItem";
import Notification from './Notification';

const notificationList = [{
  id: '10a3e55b-30b2-4d0f-8f04-2d0838e6f44f',
  senderId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  message: 'jesseinit just published a new article',
  isRead: false,
  receiverId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
  createdAt: '2019-02-19T11:05:37.508Z',
  updatedAt: '2019-02-19T11:05:37.508Z'
},
 {
  id: '10a3e55b-30b2-4d0f-8f04-2d0838e6f44f',
  senderId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
  message: 'jesseinit just published a new article',
  isRead: true,
  receiverId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
  createdAt: '2019-02-19T11:05:37.508Z',
  updatedAt: '2019-02-19T11:05:37.508Z'
}];

const onClose = jest.fn();
const updateNotification = jest.fn();

describe('<NotificationItem />', () => {
const wrapper = shallow(<NotificationItem data={notificationList[0]} updateNotification={updateNotification} />)
  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should check the visibility prop isRead is false', () => {
    expect(wrapper.find('#checkbox-span').getElement().props.style.visibility).toEqual('visible');
  });

  it('should simulate onClick of checkbox', () => {
    wrapper.find('input').simulate('click');
    expect(updateNotification.mock.calls.length).toBeGreaterThan(0);
  });

  it('should check the visibility prop isRead is true', () => {
    const wrap = shallow(<NotificationItem data={notificationList[1]} updateNotification={updateNotification} />)
    expect(wrap.find('#checkbox-span').getElement().props.style.visibility).toEqual('visible');
  });
});

describe('<NotificationItem />', () => {
  const wrapper = shallow(<Notification open onClose={onClose} notificationList={notificationList} />)
    it('should render successfully', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call onClose function', () => {
      wrapper.find('#close-icon').simulate('click');
      expect(onClose.mock.calls.length).toEqual(1);
    });

    it('should check the current style if open is true', () => {
      expect(wrapper.get(0).props.style.display).toEqual('block');
    });
    
    it('should check the current style if open is false', () => {
      wrapper.setProps({ open: false });
      expect(wrapper.get(0).props.style.display).toEqual('none');
    });

    it('should render no notification text if notificationList is empty', () => {
      wrapper.setProps({ notificationList: [] });
      expect(wrapper.text()).toEqual('You have no notifications yet<Icon />');
    });
});
  