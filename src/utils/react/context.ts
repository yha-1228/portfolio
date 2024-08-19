import React from 'react';

interface GenerateContextOptions<T> {
  defaultValue?: T;
  /**
   * @default "useContext"
   */
  hookName?: string;
  /**
   * @default "Context.Provider"
   */
  providerName?: string;
}

export function generateContext<T>(options: GenerateContextOptions<T> = {}) {
  const {
    defaultValue,
    hookName = 'useContext',
    providerName = 'Context.Provider',
  } = options;
  const Context = React.createContext<T | undefined>(defaultValue);

  function useContext() {
    const value = React.useContext(Context);
    if (!value)
      throw new Error(`${hookName} must be inside <${providerName} />`);
    return value as T;
  }

  return [Context, useContext] as const;
}
