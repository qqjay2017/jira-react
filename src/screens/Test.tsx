import { Button } from "antd";
import { useMount } from "hooks/useMount";
import React, { useEffect, useState } from "react";

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的值是:${num}`;
    return function unmount() {
      console.log(message, "message");
    };
  };
  return effect;
};

const add1 = test();
const unmount = add1();
unmount(); // 1
add1();
add1();

function Test() {
  const [num, setNum] = useState(0);
  // 解决方案: 加依赖项

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in interval", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载值", num);
    };
  }, [num]);

  const add = () => {
    setNum((_num) => _num + 1);
  };

  return (
    <div>
      <Button onClick={() => add()}>add</Button>
    </div>
  );
}

export default Test;
