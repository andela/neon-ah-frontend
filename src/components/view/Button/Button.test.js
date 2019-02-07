import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button/Button';


describe('<Button />', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Button />);
    wrapper.setProps({
        className: 'test',
        id: 'test-id',
        type: 'test_type',
        onClick: fn
    });

    it('should render succesfully', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should be able to render with an id', () => {
        wrapper.find('#test-id').simulate('click');
        expect(fn).toHaveBeenCalled();
    });
});
