import React from 'react';

export function createContext<T>(defaultValue?: T) {
  return React.createContext<T | undefined>(defaultValue);
}

type Options<T> = {
  defaultValue?: T;
  /**
   * @default "useContext"
   */
  hookName?: string;
  /**
   * @default "Context.Provider"
   */
  providerName?: string;
};

export function generateContext<T>(options: Options<T> = {}) {
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
    return value;
  }

  return [Context, useContext] as const;
}
