import { cleanObject } from "utils";

it("测试把对象空的值清空(false和0不能清),原对象不改变,返回新对象", () => {
  const object = {
    a: 1,
    b: undefined,
    c: "c",
    d: "",
    e: false,
    f: 0,
  };
  const co = cleanObject(object);

  expect(co).toEqual({ a: 1, c: "c", f: 0, e: false });
  expect(object).toEqual({
    a: 1,
    b: undefined,
    c: "c",
    d: "",
    e: false,
    f: 0,
  });
});
