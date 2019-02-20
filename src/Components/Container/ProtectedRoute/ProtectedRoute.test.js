import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import AuthenticatedRoute, { ProtectedRoute } from './ProtectedRoute';

describe('<ProtectedRoute />', () => {
  let wrapper;

  it('should render succesfully', () => {
    wrapper = shallow(<AuthenticatedRoute />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a route component', () => {
    wrapper = shallow(<ProtectedRoute />);
    expect(wrapper.is(Route)).toEqual(true);
  });

  it('renders authenticated route with render prop without crashing', () => {
    const wrapper = shallow(<ProtectedRoute component={() => <div />} isAuthenticated />);
    const render = wrapper.prop('render')({ location: {} });
    const renderWrapper = shallow(render);
    expect(renderWrapper.is('div')).toBe(true);
  });

  it('should redirect unauthenticated request to authenticatd route', () => {
    const wrapper = shallow(<ProtectedRoute isAuthenticated={false} />);
    const render = wrapper.prop('render')({ location: {} });
    expect(render.props.to).toEqual('/');
  });
});
