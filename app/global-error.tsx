'use client';

export default function GlobalError({
  error,
  // reset,
}: {
  error: Error;
  // reset: () => void;
}) {
  // global fallback component replaces the root layout, so we need to define <html> and <body>
  return (
    <html lang="en">
      <head></head>
      <body>
        <h2>Something went wrong! {error.message}</h2>
      </body>
    </html>
  );
}
