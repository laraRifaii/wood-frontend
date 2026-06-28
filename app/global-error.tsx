'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ background: '#222021', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: '#F1DED0' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: 32, marginBottom: 16 }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ background: '#E1764D', color: '#1E0C06', padding: '10px 24px', border: 'none', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}