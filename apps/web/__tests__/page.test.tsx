import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Bond Calculator Page', () => {
  it('renders calculator form', () => {
    render(<Home />);

    expect(screen.getByLabelText(/face value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/annual coupon rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/market price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years to maturity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coupon frequency/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /calculate yield/i }),
    ).toBeInTheDocument();
  });

  it('has proper form structure', () => {
    render(<Home />);

    // Check that all form elements are present
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument(); // Face value default
    expect(screen.getByDisplayValue('5')).toBeInTheDocument(); // Coupon rate default
    expect(screen.getByDisplayValue('950')).toBeInTheDocument(); // Market price default
    expect(screen.getByDisplayValue('10')).toBeInTheDocument(); // Years to maturity default
  });

  it('calculate button is clickable', () => {
    render(<Home />);

    const calculateButton = screen.getByRole('button', {
      name: /calculate yield/i,
    });

    expect(calculateButton).not.toBeDisabled();
  });
});
