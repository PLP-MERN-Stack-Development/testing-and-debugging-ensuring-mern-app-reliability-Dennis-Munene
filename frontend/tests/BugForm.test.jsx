import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import BugForm from '../src/components/BugForm';
import * as api from '../src/services/api';

// Mock the service
vi.mock('../src/services/api');

test('shows validation error for short title', async () => {
  const onAdded = vi.fn();

  render(<BugForm onAdded={onAdded} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), {
    target: { value: 'ab' },
  });

  fireEvent.click(screen.getByText('Report Bug'));

  expect(await screen.findByRole('alert')).toHaveTextContent(/Title too short/i);
  expect(onAdded).not.toHaveBeenCalled();
});

test('submits valid bug and calls onAdded', async () => {
  api.createBug.mockResolvedValue({ id: 1, title: 'abc' });

  const onAdded = vi.fn();

  render(<BugForm onAdded={onAdded} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), {
    target: { value: 'abc' },
  });

  fireEvent.change(screen.getByPlaceholderText('Reporter'), {
    target: { value: 'r' },
  });

  fireEvent.click(screen.getByText('Report Bug'));

  await waitFor(() =>
    expect(onAdded).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 })
    )
  );
});
