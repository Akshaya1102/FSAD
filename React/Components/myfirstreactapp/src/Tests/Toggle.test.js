import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleButton from '../components/Toggle';

test('ToggleButton toggles state when clicked', () => {
  const { getByText } = render(<ToggleButton />);

  // Initial state
  let buttonElement = getByText('OFF');
  expect(buttonElement).toBeInTheDocument();
  let textElement = getByText('The button is OFF');
  expect(textElement).toBeInTheDocument();

  // Click the button
  fireEvent.click(buttonElement);

  // State after clicking
  buttonElement = getByText('ON');
  expect(buttonElement).toBeInTheDocument();
  textElement = getByText('The button is ON');
  expect(textElement).toBeInTheDocument();

  // Click the button again
  fireEvent.click(buttonElement);

  // State after clicking again
  buttonElement = getByText('OFF');
  expect(buttonElement).toBeInTheDocument();
  textElement = getByText('The button is OFF');
  expect(textElement).toBeInTheDocument();
});
