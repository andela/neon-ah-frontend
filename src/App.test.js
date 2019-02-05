import React from 'react';
import { shallow } from 'enzyme';
import App from './App.jsx';

const wrapper = shallow(<App />);

describe('<App />', () => {
	it('should render successfully', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
