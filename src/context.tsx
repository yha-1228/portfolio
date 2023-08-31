'use client';

import React, { useState } from 'react';

type UseCounterContextResult = {
  count: number;
  increment: () => void;
};

const CounterContext = React.createContext<UseCounterContextResult | undefined>(
  undefined,
);

export function useCounterContext() {
  const c = React.useContext(CounterContext);
  if (!c) throw new Error('err');
  return c;
}

export function CounterProvider({
  children,
  initialCount,
}: React.PropsWithChildren<{ initialCount: number }>) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  );
}
