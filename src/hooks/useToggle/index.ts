/* eslint-disable no-redeclare */
import { useMemo, useState } from "react";

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}
// 1. 布尔值的情况
function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U
): [T | U, Actions<T | U>];

function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R
) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {
    // 如果 reverseValue 没传的话,就采用 !defaultValue
    const reverseValueOrigin = (
      reverseValue === undefined ? !defaultValue : reverseValue
    ) as D | R;
    // 左右值反转,利用setState的回调函数可以拿到最新的值,然后反转到另一个
    const toggle = () =>
      setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    // 手动赋值
    const set = (value: D | R) => setState(value);
    // 反转到默认值
    const setLeft = () => setState(defaultValue);
    // 反转到反转值
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
    // 依赖项缺失 'defaultValue' 和 'reverseValue' 的原因: 不考虑这两个值发生变化的情况
  }, []);

  return [state, actions];
}

export default useToggle;
