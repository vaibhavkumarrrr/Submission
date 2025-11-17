import React from 'react'; 
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  render(<App />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
