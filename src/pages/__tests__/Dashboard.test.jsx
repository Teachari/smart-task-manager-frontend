import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';

// Wrap components with required context providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Day 45 Dashboard Component Quality Validation', () => {
  test('Renders Task Dashboard Header cleanly', () => {
    renderWithProviders(<Dashboard />);
    const headerElement = screen.getByText(/Task Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('Renders Theme toggle interactive button element matching layout', () => {
    renderWithProviders(<Dashboard />);
    // Target the button directly using a broader text query matcher to catch emoji variations
    const themeButton = screen.getByRole('button', { name: /(light|dark)/i });
    expect(themeButton).toBeInTheDocument();
  });
});