import { useReducer, useEffect } from 'react';

export function usePersistentReducer(reducer, initialState, key) {
    const [state, dispatch] = useReducer(reducer, initialState, (defaultState) => {
        try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultState;
        } catch (e) {
        console.error('Failed to parse state from LocalStorage:', e);
        return defaultState;
        }
  });

    useEffect(() => {
        try {
        localStorage.setItem(key, JSON.stringify(state));
        } catch (e) {
        console.error('Failed to save state to LocalStorage:', e);
        }
    }, [state, key]);

    return [state, dispatch];
}