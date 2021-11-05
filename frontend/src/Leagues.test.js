import { render, screen } from '@testing-library/react';
import Leagues from './Leagues';

test('renders learn react link', () => {
  render(<Leagues />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
