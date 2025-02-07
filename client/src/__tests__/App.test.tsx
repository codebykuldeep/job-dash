import {screen } from '@testing-library/react';
import Home from '../components/Common/Home/Home';
import { renderWithProviders } from '../utils-tests/store-wrapper';

test('renders HomePage', () => {
  renderWithProviders(<Home/>);
  const HomeElement = screen.getByText('Perfect Job');
  expect(HomeElement).toBeInTheDocument();
});
