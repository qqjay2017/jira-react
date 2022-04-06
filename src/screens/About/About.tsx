import { Button } from "antd";
import useToggle from "hooks/useToggle";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

function About() {
  const [flag, { toggle, set, setLeft, setRight }] = useToggle();
  // const [searchParams] = useSearchParams();
  // const params = useParams();
  // console.log(params, "params");
  // console.log(searchParams.get("test"), "searchParams");

  return (
    <div>
      <h1> About</h1>
      <Button onClick={() => toggle()}>toggle</Button>
      <Button onClick={() => setLeft()}>setLeft</Button>
      <Button onClick={() => setRight()}>setRight</Button>
      <Button onClick={() => set(true)}>setTrue</Button>
      <Button onClick={() => set(false)}>setFalse</Button>
      <h1>{String(flag)}</h1>
    </div>
  );
}

export default About;
