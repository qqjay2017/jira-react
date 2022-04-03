// 0值也是true
import { ValueKeyIterateeTypeGuard } from "lodash";
import pickBy from "lodash/pickBy";

export const isFalsy = (value: unknown) => {
  return value === 0 ? true : !!value;
};

export const cleanObject = (object: Record<string | symbol, unknown>) => {
  // const result = {
  //   ...object,
  // };

  // Reflect.ownKeys(object).forEach((key) => {
  //   const flag = isFalsy(result[key]);
  //   if (!flag) {
  //     delete result[key];
  //   }
  // });
  // 不过滤的规则
  const predicate = (value: unknown) => {
    return value === 0 || value === false || !!value;
  };

  return pickBy(object, predicate);
};
