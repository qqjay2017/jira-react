import { Button, Input } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";

function Dayjs() {
  const [state, setState] = useState("");
  return (
    <div>
      <h1>{state}</h1>
      <h1>{state ? dayjs(state).format("YYYY-MM-DD") : state}</h1>
      <h1>13位: {state ? dayjs(Number(state)).format("YYYY-MM-DD") : state}</h1>
      <Input value={state} onChange={(e) => setState(e.target.value)} />
      <Button />
    </div>
  );
}

export default Dayjs;
