import React, { useState } from 'react';
import { createBug } from '../services/api';

export default function BugForm({ onAdded }) {
  const [title, setTitle] = useState('');
  const [reporter, setReporter] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (title.trim().length < 3) return setError('Title too short');
    try {
      setError(null);
      const bug = await createBug({ title, reporter });
      setTitle(''); setReporter('');
      onAdded(bug);
    } catch (err) {
      setError(err.message || 'Create failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="bug-form">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input value={reporter} onChange={e=>setReporter(e.target.value)} placeholder="Reporter" />
      <button type="submit">Report Bug</button>
      {error && <div role="alert">{error}</div>}
    </form>
  );
}
