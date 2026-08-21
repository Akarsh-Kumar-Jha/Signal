const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://signal-backend-gylj.onrender.com'
).replace(/\/$/, '');

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

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    const errorMsg =
      typeof data.error === 'string'
        ? data.error
        : typeof data.error === 'object' && data.error?.message
        ? data.error.message
        : data.message || `Server error (${res.status}): Unable to complete graph execution.`;

    throw new Error(errorMsg);
  }

  return data;
}
