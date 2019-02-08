import React from 'react';

import { mount, shallow } from 'enzyme';

import Modal from './Modal';

it('should render without crashing', () => {
  expect(shallow(<Modal triggerEl={<></>} />)).toMatchSnapshot();
});

it('should render Login Form without crashing', () => {
  expect(shallow(<Modal type="login" />)).toMatchSnapshot();
});
