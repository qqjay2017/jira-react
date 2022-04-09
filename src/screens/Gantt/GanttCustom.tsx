import { Table } from "antd";
import React from "react";
import styles from "./styles.module.less";

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
function GanttCustom() {
  const leftColumns = [
    {
      title: "名称",
      dataIndex: "text",
    },
    {
      title: "周期",
      dataIndex: "duration",
    },
  ];

  const rightColumns = [
    {
      title: "名称",
      dataIndex: "text",
    },
    {
      title: "周期",
      dataIndex: "duration",
    },
  ];
  return (
    <div className={styles.ganttCustom}>
      <div className={styles.left}>
        <Table
          scroll={{ x: 300 }}
          dataSource={taskData}
          columns={leftColumns}
          pagination={false}
        />
      </div>
      <div className={styles.right}>
        <Table
          scroll={{ x: 300 }}
          dataSource={taskData}
          columns={leftColumns}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default GanttCustom;
