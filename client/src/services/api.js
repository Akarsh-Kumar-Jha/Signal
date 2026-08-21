const API_BASE_URL = 'http://localhost:5000';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'ok';
  } catch (err) {
    return false;
  }
}

export async function analyzeQuery(userQuery) {
  const res = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_query: userQuery }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Server error: ${res.statusText}`);
  }

  return res.json();
}
