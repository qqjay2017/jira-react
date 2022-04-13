import {
  PartialGanttConfigOptions,
  PartialGanttTemplates,
  Task,
  TaskId,
  UseGanttCallbacks,
  GanttTooltipText,
  TrackItemRequestsModel,
} from "./types";
import { Empty, Input } from "antd";
import Decimal from "decimal.js";
import { gantt } from "./dhtmlxgantt";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";

import "./dhtmlxgantt.css";
import "./gantt.less";
import ReactDOM from "react-dom";

export const zoomConfig = {
  levels: [
    {
      name: "day",
      scale_height: 27,
      min_column_width: 80,
      scales: [
        { unit: "year", step: 1, format: "%Y年" },
        { unit: "month", step: 1, format: "%M" },
        { unit: "day", step: 1, format: "%d" },
      ],
    },
    {
      name: "week",
      scale_height: 50,
      min_column_width: 50,
      scales: [
        { unit: "year", step: 1, format: "%Y年" },
        { unit: "month", step: 1, format: "%M" },
        { unit: "week", step: 1, format: "%W周" },
      ],
    },

    {
      name: "month",
      scale_height: 50,
      min_column_width: 120,

      scales: [
        { unit: "year", step: 1, format: "%Y年" },
        { unit: "month", format: "%M" },
      ],
    },
    {
      name: "quarter",
      height: 50,
      min_column_width: 90,
      // scales: [
      //   { unit: "year", step: 1, format: "%Y年" },
      //   { unit: "month", step: 1, format: "%M" },
      // ],
      scales: [
        { unit: "year", step: 1, format: "%Y年" },
        {
          unit: "quarter",
          step: 1,
          format(date: Date) {
            var dateToStr = gantt.date.date_to_str("%M");
            var endDate = gantt.date.add(
              gantt.date.add(date, 3, "month"),
              -1,
              "day"
            );
            return `${dateToStr(date)} - ${dateToStr(endDate)}`;
          },
        },
      ],
    },
    {
      name: "year",
      scale_height: 50,
      min_column_width: 30,
      // scales: [{ unit: "year", step: 1, format: "%Y" }],
      scales: [{ unit: "year", step: 1, format: "%Y年" }],
    },
  ],
};

export const ganttCustomConfig: PartialGanttConfigOptions = {
  external_render: {
    isElement: (element: object) => {
      return React.isValidElement(element);
    },
    renderElement: (
      element: React.DOMElement<React.DOMAttributes<Element>, Element>,
      container: ReactDOM.Container | null
    ) => {
      ReactDOM.render(element, container);
    },
  },
  select_task: true,
  date_format: "%Y-%m-%d %H:%i",
  drag_links: false,
  drag_resize: false,
  drag_progress: false,
  drag_lightbox: false,
  drag_timeline: false,
  drag_move: false,

  readonly: false,

  drag_project: false,
  // 段参数以及单位
  duration_unit: "day",
  duration_step: 1,
  scale_height: 3 * 28,
  bar_height: 20,
  row_height: 40,
};

export const beforeInitGantt = (callback?: Function) => {
  callback && callback();
  gantt.clearAll();
  gantt.ext.zoom.init(zoomConfig);
  gantt.i18n.setLocale("cn");

  gantt.plugins({
    marker: true,
    tooltip: true,
    toolbar: true,
    // auto_scheduling: true,
  });

  // 任务的颜色 // 进行中状态、未开始状态、已完成状态显示图例不一样。
  gantt.templates.task_class = function (start, end, task) {
    const finishPercent = String(task.progress);
    // console.log(finishPercent, "finishPercent");
    if (finishPercent === "100") {
      return "bg-finished";
    }
    if (finishPercent === "0") {
      return "bg-default";
    }

    return "bg-unfinished";
  };

  gantt.addMarker({
    start_date: new Date(),
    text: "今日",
  });
};

export const GanttEmpty = () => {
  return <Empty />;
};

/**
 *
 * @param ganttContainer 初始化容器
 * @param data  初始化数据,需要先处理好
 * @param callbacks 回调函数
 * @param ganttConfigOptions 初始化配置,会覆盖默认配置
 * @returns 甘特图实例
 */

export const useGantt = (
  ganttContainer: React.RefObject<HTMLDivElement>,
  data: Task[],
  callbacks: UseGanttCallbacks,
  ganttConfigOptions?: PartialGanttConfigOptions,
  templates?: PartialGanttTemplates
) => {
  const ganttInstance = useRef<typeof gantt | null>(null);

  const options = {
    ...ganttCustomConfig,
    ...(ganttConfigOptions || {}),
  };

  const init = useCallback(() => {
    if (!ganttContainer || !ganttContainer.current) {
      return;
    }
    if (ganttInstance.current) {
      ganttInstance.current.render();
      return;
    }
    beforeInitGantt(callbacks?.beforeInitGantt);

    gantt.config = {
      ...gantt.config,
      ...options,
    };
    gantt.locale.labels.section_baseline = "Planned";

    gantt.templates = {
      ...gantt.templates,
      ...(templates || {}),
    };

    // 禁用原来自带的弹窗
    gantt.attachEvent(
      "onBeforeLightbox",
      (id) => {
        return false; // 返回 false
      },
      {}
    );
    gantt.attachEvent(
      "onContextMenu",
      (taskId, linkId, event) => {
        callbacks?.onContextMenu &&
          callbacks?.onContextMenu(taskId, linkId, event);
        return false;
      },
      {}
    );

    gantt.attachEvent(
      "onAfterTaskUpdate",
      (taskId, linkId, event) => {
        gantt.render();

        return true;
      },
      {}
    );
    // 任务双击进入编辑事件
    gantt.attachEvent(
      "onTaskDblClick",
      (id, e) => {
        callbacks?.onTaskDblClick && callbacks.onTaskDblClick(id, e);

        return true;
      },
      {}
    );
    // 点新增按钮?

    gantt.attachEvent(
      "onGanttReady",
      () => {
        const { tooltips } = gantt.ext;
        tooltips.tooltip.setViewport((gantt as any).$task_data);
      },
      {}
    );
    gantt.attachEvent(
      "onTaskSelected",
      (id: TaskId) => {
        callbacks?.onTaskSelected && callbacks.onTaskSelected(id);
        return true;
      },
      {}
    );
    gantt.attachEvent(
      "onTaskUnselected",
      (id: TaskId) => {
        callbacks?.onTaskUnselected && callbacks.onTaskUnselected("");
        return true;
      },
      {}
    );
    gantt.attachEvent(
      "onTaskLoading",
      (task) => {
        task.planned_start = gantt.date.parseDate(
          task.planned_start,
          "xml_date"
        );
        task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
        return true;
      },
      {}
    );

    gantt.init(ganttContainer.current);

    gantt.addTaskLayer((task: Task) => {
      if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(
          task,
          task.planned_start as any,
          task.planned_end as any
        );
        console.log(sizes, "sizes");

        const el = document.createElement("div");
        el.className = "baseline";
        el.style.left = `${sizes.left}px`;
        el.style.width = `${sizes.width}px`;
        const top = `${sizes.top + 20}px`;
        console.log(top, "top");
        el.style.top = top;
        return el;
      }
      return false;
    });

    gantt.parse({
      data,
    });

    callbacks?.afterInitGantt && callbacks.afterInitGantt();
    ganttInstance.current = gantt;
  }, [ganttConfigOptions, data, callbacks, ganttContainer]);

  useEffect(() => {
    init();
  }, []);

  return {
    ganttInstance,
  };
};

/**
 * 进度跟踪页面甘特图的toolTip
 * @param start
 * @param end
 * @param task
 * @returns
 *  HOW TO USE: gantt.templates.tooltip_text = trackDetailGanttToolTip()
 */
export const trackDetailGanttToolTip: GanttTooltipText<Task> = (
  start,
  end,
  task
) => {
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

/**
 * 把接口回来的数据 `TrackItemRequestsModel[]` 处理成 `Task[]`
 * @param dataSource
 * @param temp
 * @param parent
 * @returns
 */

export function genTrackDetailGanttTaskData<D extends TrackItemRequestsModel>(
  dataSource: D[],
  temp: Task[] = [],
  parent: TaskId
) {
  const res: Task[] = temp;

  dataSource.reduce((memo, d) => {
    if (d.children && d.children.length) {
      genTrackDetailGanttTaskData(d.children, res, d.id);
    }
    memo.push({
      parent,
      id: d.id,
      text: d.name,
      start_date: moment(d.realStartTime).format("YYYY-MM-DD"),
      end_date: moment(d.realEndTime).format("YYYY-MM-DD"),
      duration: d.planDay,
      progress: d.percentageCompleted / 100,
      originData: d,
      open: String(parent) === "0",
    });

    return memo;
  }, res);

  return res;
}

/**
 * obj类型暂时写死Task
 */

export const ganttColumnDataFormat = {
  progress(obj: Task) {
    return `${(obj.progress * 100).toFixed(0)}%`;
  },

  duration(obj: Task) {
    return `${obj.duration} 天`;
  },
};
