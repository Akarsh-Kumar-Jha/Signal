const PREFIX = 'signalai_report_';

export function saveReport(reportId, query, data) {
  try {
    const payload = {
      reportId,
      query,
      timestamp: new Date().toISOString(),
      data,
    };
    localStorage.setItem(`${PREFIX}${reportId}`, JSON.stringify(payload));
  } catch (err) {
    console.warn('Failed to save report to localStorage:', err);
  }
}

export function getReport(reportId) {
  try {
    const raw = localStorage.getItem(`${PREFIX}${reportId}`);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('Failed to get report from localStorage:', err);
    return null;
  }
}

export function savePendingQuery(reportId, query) {
  try {
    localStorage.setItem(`signalai_pending_${reportId}`, query);
  } catch (err) {
    console.warn('Failed to save pending query:', err);
  }
}

export function getPendingQuery(reportId) {
  try {
    return localStorage.getItem(`signalai_pending_${reportId}`);
  } catch (err) {
    return null;
  }
}

export function removePendingQuery(reportId) {
  try {
    localStorage.removeItem(`signalai_pending_${reportId}`);
  } catch (err) {
    // ignore
  }
}
