// src/components/MainContent.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'mobx-react';
import MainContent from './MainContent';
import store from '../stores/DataStore';

jest.mock('axios');

test('fetches and displays data from API', async () => {
  store.fetchData = jest.fn().mockResolvedValue([
    { name: { first: 'John', last: 'Doe' } },
    { name: { first: 'Jane', last: 'Doe' } },
  ]);

  render(
    <Provider store={store}>
      <MainContent />
    </Provider>
  );

  await waitFor(() => {
    const userElements = screen.getAllByText(/Doe/i);
    expect(userElements).toHaveLength(2);
  });
});

test('displays loading state initially', () => {
  render(
    <Provider store={store}>
      <MainContent />
    </Provider>
  );

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
