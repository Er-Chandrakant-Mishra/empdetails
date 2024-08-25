import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders header with title', () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText(/My React MobX Project/i);
  expect(headerElement).toBeInTheDocument();
});
