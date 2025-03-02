import React from "react";

type UseSessionStorage = <T>(
  key: string,
  initialValue: T
) => [T, React.Dispatch<React.SetStateAction<T>>];

const useSessionStorage: UseSessionStorage = <T>(
  key: string,
  initialValue: T
) => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(
        `sessionStorage에서 key "${key}"를 읽는 중 에러 발생:`,
        error
      );
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(
        `sessionStorage에 key "${key}"를 쓰는 중 에러 발생:`,
        error
      );
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useSessionStorage;
