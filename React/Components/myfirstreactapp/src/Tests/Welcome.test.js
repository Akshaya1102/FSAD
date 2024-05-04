import React from 'react';
import renderer from 'react-test-renderer';
import Welcome from '../components/Welcome';

test('should render component correctly', () => {
  const component=renderer.create(<Welcome />);
  expect(component.toJSON()).toMatchSnapshot();
});
