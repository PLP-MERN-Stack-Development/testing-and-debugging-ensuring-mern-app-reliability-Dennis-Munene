import React from 'react';

export default function BugList({ bugs = [], onDelete, onUpdate }) {
  if (!bugs.length) return <div>No bugs</div>;
  return (
    <ul>
      {bugs.map(b => (
        <li key={b.id} data-testid={`bug-${b.id}`}>
          <strong>{b.title}</strong> - {b.status}
          <button onClick={() => onUpdate(b.id, { status: 'in-progress' })}>Start</button>
          <button onClick={() => onUpdate(b.id, { status: 'resolved' })}>Resolve</button>
          <button onClick={() => onDelete(b.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
