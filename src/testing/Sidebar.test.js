import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

test('renders sidebar with navigation links', () => {
  const { getByText } = render(<Sidebar />);
  const homeLink = getByText(/Home/i);
  const aboutLink = getByText(/About/i);
  const contactLink = getByText(/Contact/i);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});
