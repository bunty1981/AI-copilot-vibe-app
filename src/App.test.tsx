import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calendar app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Personal Calendar/i);
  expect(linkElement).toBeInTheDocument();
});