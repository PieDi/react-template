import { useCallback, useState, useRef } from 'react';

function useCountDown() {
  const [remain, setRemain] = useState<number>(60);
  const timer = useRef<number>();
  console.log(111, remain, timer.current);
  const startCountDown = useCallback((m = remain) => {
    if (timer.current) clearTimeout(timer.current);
    if (m < 0) return;
    setRemain(m);
    timer.current = setTimeout(() => {
      console.log(222, remain);
      startCountDown(m - 1);
    }, 1000);
  }, [remain]);
  return {
    remain,
    startCountDown,
  };
}

export default useCountDown;
