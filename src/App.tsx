import "./App.less";

import GridLayout from "screens/grid-layout";
import { useBoolean } from "ahooks";

import { Route, Routes } from "react-router-dom";
import ProjectListScreen from "screens/project-list";
import Login from "screens/login";
import About from "screens/About";
import NoMatch from "screens/NoMatch";
import Home from "screens/Home";
import GanttInitial from "screens/Gantt/GanttInitial";
import Dayjs from "screens/Dayjs/Dayjs";
import GanttCustom from "screens/Gantt/GanttCustom";

function App() {
  const [flag, { toggle }] = useBoolean(false);
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<GridLayout />}>
          <Route index element={<Home />} />
          <Route path={"project"} element={<ProjectListScreen />} />
          <Route path={"gantt-initial"} element={<GanttInitial />} />
          <Route path={"gantt-custom"} element={<GanttCustom />} />
          <Route path={"day-js"} element={<Dayjs />} />
          <Route path={"about/:id"} element={<About />} />
          <Route path={"*"} element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
