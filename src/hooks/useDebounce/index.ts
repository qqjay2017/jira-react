import { useEffect, useRef, useState } from "react";

// interface DebounceOptions {
//   wait?: number;
//   leading?: boolean;
//   trailing?: boolean;
// }
// type Fn = (...args: any) => any;
// const debounce = (func: Function, delay = 100) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   return () => {
//     //  闭包
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func();
//     }, delay);
//   };
// };

/**
 * const debouncedParam = useDebounce(param,2000)
 *
 * @param value 依赖项
 * @param delay 延迟,默认200
 */

export const useDebounceParam = <T>(value: T, delay = 1000) => {
  const [debouncedParam, setDebouncedParam] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedParam(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedParam;
};
