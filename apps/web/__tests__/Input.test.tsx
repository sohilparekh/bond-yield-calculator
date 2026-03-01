import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@repo/ui/index';

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter value" />);

    const input = screen.getByPlaceholderText(/enter value/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('flex');
  });

  it('renders with custom type', () => {
    render(<Input type="number" placeholder="Enter number" />);

    const input = screen.getByPlaceholderText(/enter number/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} />);

    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('ui:disabled:cursor-not-allowed');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });
});
