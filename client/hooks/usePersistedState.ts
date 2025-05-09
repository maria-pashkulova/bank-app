import { useState } from "react";

function usePersistedState(key: string, defaultValue: any) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const persistedState = localStorage.getItem(key);
      if (persistedState) {
        return JSON.parse(persistedState);
      }
    }

    return defaultValue;
  });

  const setPersistedState = (value: any) => {
    if (typeof window !== "undefined") {
      if (!value) {
        localStorage.removeItem(key);
        setState({});
      } else {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
      }
    }
  };
  return [state, setPersistedState];
}

export default usePersistedState;
