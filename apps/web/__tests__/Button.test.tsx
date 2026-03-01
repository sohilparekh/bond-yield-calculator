import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@repo/ui/index';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole<HTMLButtonElement>('button', {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with custom variant', () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('ui:bg-destructive');
  });

  it('renders with custom size', () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('ui:h-11');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('ui:disabled:opacity-50');
  });
});
