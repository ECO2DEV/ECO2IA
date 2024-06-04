import { useState, useEffect } from 'react';

export const useLocalStorageWithExpiration = ({ key, initialValue }) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      // Initial state on the server should be a placeholder
      return initialValue;
    }

    // Placeholder initial state on the client-side before useEffect runs
    return null;
  });
  const [isExerciseStored, setIsExerciseStored] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
          setIsExerciseStored(false);
          setStoredValue(initialValue);
          return;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        if (new Date(item.expiration) < now) {
          localStorage.removeItem(key);
          setIsExerciseStored(false);
          setStoredValue(initialValue);
          return;
        }

        setIsExerciseStored(true);
        setStoredValue(item.value);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
        setIsExerciseStored(false);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 5 * 60 * 60 * 1000); // 5 hours in milliseconds

      const item = {
        value: value,
        expiration: expirationDate.toISOString()
      };
      setIsExerciseStored(true);
      localStorage.setItem(key, JSON.stringify(item));
      setStoredValue(value);
    } catch (error) {
      setIsExerciseStored(false);
      console.error('Error setting localStorage:', error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        setIsExerciseStored(false);
        setStoredValue(initialValue);
        return;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if (new Date(item.expiration) < now) {
        localStorage.removeItem(key);
        setStoredValue(initialValue);
        setIsExerciseStored(false);
        return;
      }
      setIsExerciseStored(true);
      setStoredValue(item.value);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, isExerciseStored];
};
