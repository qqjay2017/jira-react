import React, { useEffect, useRef } from "react";

import moment from "moment";
import Decimal from "decimal.js";
import { Button } from "antd";
import GanttBase from "./GanttBase";
import { Task } from "./types";

const taskData: Array<Task<any>> = [
  {
    id: "1",
    text: "Task #1",
    start_date: "2019-04-16",
    end_date: "2019-04-21",
    planned_start: "2019-04-12",
    planned_end: "2019-04-18",

    parent: 0,
    duration: 5,
    edit: false,
    open: true,

    progress: 0.8,
    sortorder: 20,
  },
  {
    duration: 4,
    id: "2",
    open: true,
    parent: 1,
    progress: 0.5,
    planned_start: "2019-04-12",
    planned_end: "2019-04-22",
    edit: false,
    sortorder: 10,
    start_date: "2019-04-17",
    end_date: "2019-04-20",
    text: "Task #3",
  },
  {
    id: "4",
    parent: 0,
    edit: false,
    planned_start: "2019-04-15",
    planned_end: "2019-04-20",
    text: "Task #2",
    start_date: "2019-04-18",
    end_date: "2019-04-20",
    duration: 3,
    progress: 0.4,
  },
];

function GanttInitial() {
  return (
    <div>
      <GanttBase initData={taskData} callbacks={{}} config={{}} />
    </div>
  );
}

export default GanttInitial;
