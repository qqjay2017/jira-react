import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Select,
  Space,
} from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { nanoid } from "nanoid";
import { GanttEmpty, useGantt } from "./common";
import {
  GanttInstance,
  GanttZoomUnit,
  PartialGanttConfigOptions,
  PartialGanttTemplates,
  Task,
  TaskId,
  UseGanttCallbacks,
} from "./types";
import moment from "moment";

/**
 * 非受控组件
 * @param data
 * @param callbacks
 * @param config
 */

interface GanttBaseProps {
  initData: Task[];
  callbacks?: UseGanttCallbacks;
  config: PartialGanttConfigOptions;
  templates?: PartialGanttTemplates;
}

const GanttBase = forwardRef<GanttInstance, GanttBaseProps>((props, ref) => {
  const { initData: data, callbacks, config, templates } = props;
  const [selectedTaskId, setSelectedTaskId] = useState<TaskId>("");

  const ganttContainer = useRef<HTMLDivElement>(null);

  const callbacksH = {
    ...callbacks,
    onTaskSelected: (id: TaskId) => {
      setSelectedTaskId(id);
      callbacks?.onTaskSelected && callbacks?.onTaskSelected(id);
    },

    onTaskUnselected: (id: TaskId) => {
      setSelectedTaskId("");
      callbacks?.onTaskSelected && callbacks?.onTaskSelected("");
    },
    // onTaskDblClick: (id: TaskId, e: any) => {
    //   startEditTask(id);

    //   callbacks?.onTaskDblClick && callbacks?.onTaskDblClick(id, e);
    // },
    // onContextMenu: (taskId: TaskId, linkId: any, event: any) => {
    //   callbacks?.onContextMenu &&
    //     callbacks?.onContextMenu(taskId, linkId, event);

    //   // const x =
    //   //   event.clientX +
    //   //   document.body.scrollLeft +
    //   //   document.documentElement.scrollLeft;
    //   // const y =
    //   //   event.clientY +
    //   //   document.body.scrollTop +
    //   //   document.documentElement.scrollTop;
    //   // console.log(x, y);
    // },
  };
  const durationEditor = {
    type: "number",
    map_to: "duration",
    min: 0,
    max: 100,
  };

  config.columns = [
    {
      // id不允许修改
      name: "id",
      label: "id",
      align: "left",
      width: "*",
      tree: true,
    },
    {
      name: "start_date",
      label: "开始时间",
      align: "center",
      width: "*",
      editor: {
        type: "date",
        map_to: "start_date",
      },
    },
    {
      name: "duration",
      label: "持续时间",
      align: "center",
      width: "*",
      editor: durationEditor,
    },
    {
      name: "progress",
      label: "完成度",
      align: "center",
      width: "*",
      editor: {
        type: "number",
        map_to: "progress",
        min: 0,
        max: 100,
        step: 0.1,
      },
    },
  ];

  const { ganttInstance } = useGantt(
    ganttContainer,
    data,
    callbacksH,
    config,
    templates
  );

  // const [curSelectTaskId, setCurSelectTaskId] = useState<TaskId | undefined>(
  //   undefined
  // );

  const [zoomUnit, setZoomUnit] = useState<GanttZoomUnit>("day");
  const onZoomUnitChange = (unit: GanttZoomUnit) => {
    if (!ganttInstance.current) {
      return false;
    }
    setZoomUnit(unit);
    ganttInstance.current.ext.zoom.setLevel(unit);
  };
  // 暴露出去的ref
  // 获取选中的id
  const getSelectedId = () => {
    if (!ganttInstance || !ganttInstance.current) {
      return "";
    }
    return ganttInstance.current.getSelectedId();
  };
  // 获取选中任务
  const getSelectedTask: () => Task = () => {
    if (!ganttInstance || !ganttInstance.current) {
      return "";
    }
    const selectedId = getSelectedId();
    if (!selectedId) {
      return null;
    }

    return ganttInstance.current.getTask(selectedId);
  };
  // 新增任务
  const addTask = (task: Task, parent?: TaskId) => {
    if (!ganttInstance || !ganttInstance.current) {
      return 0;
    }
    const addRes = ganttInstance.current.addTask(task, parent);
    ganttInstance.current.render();
    return addRes;
  };
  // 获取全部任务
  const getAllTask: () => Task[] = () => {
    if (!ganttInstance || !ganttInstance.current) {
      return [];
    }
    // 把对象转成数组返回
    const pull = ganttInstance.current.getDatastore("task")?.pull as Record<
      string,
      Task
    >;

    if (!pull) {
      return [];
    }
    return Reflect.ownKeys(pull).map((key) => {
      return pull[key as any];
    });
  };
  // 移除选中任务
  const removeSelectedTask = () => {
    if (!ganttInstance || !ganttInstance.current) {
      return false;
    }
    const taskId = getSelectedId();
    ganttInstance.current.deleteTask(taskId);
    ganttInstance.current.render();
    return taskId;
  };
  const removeTaskById = (id: TaskId) => {
    if (!ganttInstance || !ganttInstance.current) {
      return false;
    }
    ganttInstance.current.deleteTask(id);

    ganttInstance.current.render();
    return id;
  };

  const startEditTask = (id: TaskId) => {
    if (!ganttInstance || !ganttInstance.current) {
      return false;
    }
    const curTask = ganttInstance.current.getTask(id);
    curTask.edit = true;
    ganttInstance.current.updateTask(String(id), curTask);
    ganttInstance.current.render();
  };
  const updateTask = (id: TaskId, task: Partial<Task>) => {
    if (!ganttInstance || !ganttInstance.current) {
      return false;
    }
    // TODO 待测试是否能成功修改
    const curTask = ganttInstance.current.getTask(id);
    // Reflect.ownKeys(task).forEach((key) => {
    //   const k = key as unknown as keyof Task;
    //   curTask[k] = task[k];
    // });
    if (!curTask) {
      return false;
    }

    ganttInstance.current.updateTask(String(id), {
      ...curTask,
      ...task,
    });
    // ganttInstance.current.render();
  };

  const handleMenuClick = (e: { key: string }, taskId: TaskId) => {
    if (!ganttInstance.current) {
      return false;
    }
    const { key } = e;
    const task = getSelectedTask();
    if (!task) {
      return false;
    }
    if (key == "add") {
      const n10 = nanoid(4);
      addTask(
        {
          ...task,
          id: n10,
          text: `new Task #${n10.substring(0, 4)}`,
        },
        taskId
      );
      ganttInstance.current.open(taskId);
    } else if (key == "edit") {
      const curTask = ganttInstance.current.getTask(taskId);
      curTask.edit = true;

      updateTask(taskId, curTask);
    } else if (key == "delete") {
      removeTaskById(taskId);
    }
  };

  const handleAddTopTask = () => {
    if (!ganttInstance.current) {
      return false;
    }
    const allTask = getAllTask();
    const lastTop = allTask.reverse().find((t) => String(t.parent) === "0");
    const n10 = nanoid(4);
    // 找到可参照生成物
    if (lastTop) {
      addTask(
        {
          ...lastTop,
          id: n10,
          text: `new Task #${n10.substring(0, 4)}`,
        },
        "0"
      );
    } else {
      //
      addTask(
        {
          id: n10,
          text: `new Task #${n10.substring(0, 4)}`,
          start_date: moment().format("YYYY-MM-DD"),
          end_date: moment().format("YYYY-MM-DD"),
          parent: 0,
          duration: 1,
          edit: false,
          open: true,

          progress: 1,
          sortorder: 20,
        },
        "0"
      );
    }
  };

  // const onDurationInputBlur = (value: string, taskId: TaskId) => {
  //   console.log(value, taskId, "修改失焦");
  // };

  // const onDurationInputChange = (e: number, id: TaskId, task: Task) => {
  //   task.duration = e;
  //   console.log(id, task, "id, task");
  //   ganttInstance.current?.render();
  //   // updateTask(id, task);
  // };

  const getLastTask = () => {
    console.log(getAllTask());
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        nativeInstance: ganttInstance,
        getZoomUnit: () => zoomUnit,
        getSelectedId,
        getSelectedTask,
        addTask,
        getAllTask,
        removeSelectedTask,
        removeTaskById,
        startEditTask,
        updateTask,
      };
    },
    [zoomUnit]
  );
  if (!data || !data.length) {
    return <GanttEmpty />;
  }
  return (
    <div>
      <div>
        <div>
          切换视图:
          <Select
            size="small"
            value={zoomUnit}
            style={{ width: "80px" }}
            onChange={(e) => onZoomUnitChange(e)}
          >
            <Select.Option value="year">年</Select.Option>
            <Select.Option value="quarter">季</Select.Option>
            <Select.Option value="month">月</Select.Option>
            <Select.Option value="week">周</Select.Option>
            <Select.Option value="day">日</Select.Option>
          </Select>
        </div>

        <div>
          <Space>
            图例:
            <div
              style={{ width: "32px", height: "32px", background: "#84bd54" }}
            >
              结束
            </div>
            <div
              style={{ width: "32px", height: "32px", background: "#5692f0" }}
            >
              进行中
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              未开始
            </div>
          </Space>
        </div>
        <div>
          <Space>
            已选的: {selectedTaskId}
            <Button onClick={() => handleAddTopTask()}>新增(顶级)</Button>
            <Button
              disabled={!selectedTaskId}
              onClick={() => handleMenuClick({ key: "add" }, selectedTaskId)}
            >
              新增(子集)
            </Button>
            <Button
              disabled={!selectedTaskId}
              onClick={() => handleMenuClick({ key: "delete" }, selectedTaskId)}
            >
              删除
            </Button>
            <Button onClick={() => getLastTask()}>获取修改后的任务(dev)</Button>
          </Space>
        </div>
      </div>
      <div
        ref={ganttContainer}
        style={{ width: "100%", minWidth: "500px", height: "500px" }}
      />
    </div>
  );
});

export default GanttBase;
