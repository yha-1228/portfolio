import React from 'react';

export interface GenerateContextOptions {
  /**
   * @default "useContext"
   */
  hookName?: string;
  /**
   * @default "Context.Provider"
   */
  providerName?: string;
}

export function generateContext<T>(options: GenerateContextOptions = {}) {
  const { hookName = 'useContext', providerName = 'Context.Provider' } =
    options;
  const Context = React.createContext<T | null>(null);

  function useContext() {
    const value = React.useContext(Context);
    if (!value)
      throw new Error(`${hookName} must be inside <${providerName} />`);
    return value as T;
  }

  return [Context, useContext] as const;
}
