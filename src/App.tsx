import "./App.less";

import GridLayout from "screens/grid-layout";
import { useBoolean } from "ahooks";
import { Button } from "antd";

function App() {
  const [flag, { toggle }] = useBoolean(false);
  return (
    <div className="App">
      <Button onClick={() => toggle()}>toggle</Button>
      {flag ? <GridLayout /> : null}
    </div>
  );
}

export default App;
