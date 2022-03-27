// 0值也是true
export const isFalsy = (value: unknown) => {
  return value === 0 ? true : !!value;
};

export const cleanObject = (object: Record<string | symbol, any>) => {
  const result = {
    ...object,
  };

  Reflect.ownKeys(object).forEach((key) => {
    const flag = isFalsy(result[key]);
    if (!flag) {
      delete result[key];
    }
  });

  return result;
};
