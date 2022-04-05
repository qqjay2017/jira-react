import { Button } from "antd";
import { useMount } from "hooks/useMount";
import React, { useEffect, useState } from "react";

function Test() {
  const [num, setNum] = useState(0);
  // 闭包的坑: 始终输出的都是初始值:0
  useMount(() => {
    setInterval(() => {
      console.log("num in interval", num);
    }, 1000);
  });
  // 闭包的坑: 始终输出的都是初始值:0
  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, []);

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
