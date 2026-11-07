import React, { useEffect, useState } from 'react';

// Must match the data-goatcounter site in index.html
const COUNTER_URL = 'https://roshanbinoj.goatcounter.com/counter/TOTAL.json';

export const VisitCounter: React.FC = () => {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(COUNTER_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: string } | null) => setCount(data?.count ?? null))
      // Blocked or unavailable counter: the footer just renders without it
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (count === null) return null;

  return <div style={{ color: 'var(--color-gold)' }}>VISITS: {count}</div>;
};
