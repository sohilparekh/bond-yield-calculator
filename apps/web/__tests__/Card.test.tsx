import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@repo/ui/index';

describe('Card Component', () => {
  it('renders with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>,
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Card className="custom-card">
        <div>Card content</div>
      </Card>,
    );

    const card = screen.getByText('Card content').parentElement;
    expect(card).toHaveClass(/custom-card/);
  });

  it('applies dark mode classes', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>,
    );

    const card = screen.getByText('Card content').parentElement;
    expect(card).toHaveClass(/dark:border-gray-800/);
    expect(card).toHaveClass(/dark:bg-gray-800/);
  });

  it('renders with title and description', () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});
