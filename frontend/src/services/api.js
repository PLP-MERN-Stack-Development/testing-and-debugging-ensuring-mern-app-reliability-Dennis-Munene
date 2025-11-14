const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function fetchBugs() {
  const res = await fetch(`${API_BASE}/bugs`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function createBug(payload) {
  const res = await fetch(`${API_BASE}/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({message:'Unknown'}));
    throw new Error(err.message || 'Create failed');
  }
  return res.json();
}
