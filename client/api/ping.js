// api/ping.js
export default async function handler(req, res) {
  try {
    const response = await fetch(
      `${process.env.VITE_API_URL || 'https://portfolio-backend-jblq.onrender.com'}/api/health/`,
      { signal: AbortSignal.timeout(30000) }
    );
    const data = await response.json();
    res.status(200).json({ pinged: true, backend: data });
  } catch (err) {
    res.status(200).json({ pinged: false, error: err.message });
  }
}
