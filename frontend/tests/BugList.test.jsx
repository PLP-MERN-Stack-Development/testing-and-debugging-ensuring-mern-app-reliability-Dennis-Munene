import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugList from '../src/components/BugList';

test('renders empty state', () => {
  render(<BugList bugs={[]} />);
  expect(screen.getByText(/No bugs/i)).toBeInTheDocument();
});

test('buttons call handlers', () => {
  const update = vi.fn(); // use vi.fn() for Vitest
  const del = vi.fn();

  const bugs = [{ id: 1, title: 'X', status: 'open' }];

  render(<BugList bugs={bugs} onDelete={del} onUpdate={update} />);

  fireEvent.click(screen.getByText('Start'));

  expect(update).toHaveBeenCalledWith(1, { status: 'in-progress' });
});
