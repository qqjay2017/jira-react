import React, { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import moment from "moment";
import Decimal from "decimal.js";
import { Button } from "antd";

interface Task {
  id: number;
  text: string;
  start_date: string;
  parent?: number;
  duration: number;

  open?: boolean;

  progress: number;
  sortorder?: number;
  edit?: boolean;
}
const taskData: Task[] = [
  {
    id: 1,
    text: "Task #1",
    start_date: "2019-04-15",
    parent: 0,
    duration: 3,

    open: true,

    progress: 0.8,
    sortorder: 20,
  },
  {
    duration: 4,
    id: 2,
    open: true,
    parent: 1,
    progress: 0.5,
    sortorder: 10,
    start_date: "2019-04-06 00:00:00",
    text: "Task #3",
  },
  {
    id: 4,
    text: "Task #2",
    start_date: "2019-04-18",
    duration: 3,
    progress: 0.4,
  },
];
const data: {
  data: Task[];
} = {
  data: taskData,
  //   links: [{ id: 1, source: 1, target: 2, type: "0" }],
};

function GanttInitial() {
  const ganttContainer = useRef(null);
  const ganttInstance = useRef<typeof gantt | null>(null);
  const currentEditIndex = useRef<number | false>(false);
  useEffect(() => {
    if (!ganttContainer.current) {
      return;
    }
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.config.drag_links = false;
    gantt.config.drag_resize = false;
    gantt.config.drag_progress = false;
    gantt.config.drag_lightbox = false;
    gantt.config.drag_timeline = false;
    gantt.config.drag_move = false;

    gantt.config.drag_project = false;
    console.log(gantt.config.columns[2], "gantt.config.columns[2]");
    gantt.config.columns = [
      gantt.config.columns[0],
      gantt.config.columns[1],
      gantt.config.columns[2],
    ];

    gantt.config.columns[2].template = (_: Task) => {
      const { duration, edit } = _;
      if (!edit) {
        return `<div>${duration}aaa</div>`;
      }
      return `<div><input value=${duration}></input></div>`;
    };

    console.log(gantt.config, "gantt.config");
    gantt.i18n.setLocale("cn");
    gantt.plugins({
      tooltip: true,
    });
    gantt.templates.tooltip_text = function (start, end, task) {
      const gantt_tooltip = document.querySelector(".gantt_tooltip");
      if (gantt_tooltip && gantt_tooltip.parentNode) {
        gantt_tooltip.parentNode?.removeChild(gantt_tooltip);
      }
      const progress = new Decimal(task.progress * 100);
      return `
      <div>${task.text}</div>
      <div>计划开始:${moment(start).format("YYYY-MM-DD")}</div>
      <div>计划完成:${moment(end)
        .subtract(1, "days")
        .format("YYYY-MM-DD")}</div>
      <div>完成占比:${progress.toFixed(2, Decimal.ROUND_UP)}%</div>
      <div>计划工期:${task.duration}天</div>
      `;
    };
    gantt.init(ganttContainer.current);

    gantt.attachEvent(
      "onTaskDblClick",
      (id, e) => {
        // any custom logic here
        return false;
      },
      {}
    );
    gantt.attachEvent(
      "onLinkClick",
      (id, e) => {
        // any custom logic here
        return false;
      },
      {}
    );
    gantt.attachEvent(
      "onTaskDblClick",
      (id: number, mouseEvent) => {
        const task = taskData.find((t) => String(t.id) === String(id));

        if (task) {
          console.log(task, "task");
          task.edit = true;

          gantt.refreshData();
        }
      },
      {}
    );
    gantt.parse(data);
    ganttInstance.current = gantt;
  }, []);

  const addItem = () => {
    if (!ganttInstance || !ganttInstance.current) {
      return false;
    }
    console.log("", "ganttInstance");
    ganttInstance.current.addTask({
      id: Math.random() * 1000 + Math.random() * 1000,
      text: "Task #4",
      start_date: "2019-04-18",
      duration: 3,
      progress: 0.4,
      edit: true,
    });
    ganttInstance.current.refreshData();
  };
  return (
    <div>
      <Button onClick={() => addItem()}>add</Button>
      <div
        ref={ganttContainer}
        id="gantt_here"
        style={{ width: "800px", height: "400px" }}
      />
    </div>
  );
}

export default GanttInitial;
