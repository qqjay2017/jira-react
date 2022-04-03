import { useEffect, EffectCallback } from "react";

export const useMount = (callback: EffectCallback) => {
  // TODO 依赖项加上callback会无限循环
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};
