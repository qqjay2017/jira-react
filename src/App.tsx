import "./App.less";

import GridLayout from "screens/grid-layout";
import { useBoolean } from "ahooks";

import { Route, Routes } from "react-router-dom";
import ProjectListScreen from "screens/project-list";
import Login from "screens/login";
import About from "screens/About";
import NoMatch from "screens/NoMatch";
import Home from "screens/Home";

function App() {
  const [flag, { toggle }] = useBoolean(false);
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<GridLayout />}>
          <Route index element={<Home />} />
          <Route path={"project"} element={<ProjectListScreen />} />
          <Route path={"about/:id"} element={<About />} />
          <Route path={"*"} element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
