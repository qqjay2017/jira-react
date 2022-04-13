import { gantt, GanttConfigOptions, GanttTemplates } from "./dhtmlxgantt";
import React from "react";

export type TaskId = string | number;

export type PartialGanttConfigOptions = Partial<GanttConfigOptions>;
export type PartialGanttTemplates = Partial<GanttTemplates>;

export interface TrackItemRequestsModel {
  adjustId: string;
  dataVersion: number;
  delFlag: number;
  id: string;
  keyTask: number;
  name: string;
  parentTaskNo: string;
  percentageCompleted: number;
  percentageDueToCompletion: number;
  planDay: number;
  planEndDate: string;
  realStartTime: string;
  realEndTime: string;
  planEndTime: number;
  planStartDate: string;
  planStartTime: number;
  progressDeviation: number;
  projectName: string;
  quantities: string;
  sourceId: string;
  taskNo: string;
  unit: string;
  children?: TrackItemRequestsModel[];
}

/**
 * 甘特图任务类型
 */

export interface Task<M = any> {
  id: TaskId;
  text: string;
  planned_start?: string | Date;
  planned_end?: string | Date;

  start_date: string; // 开始时间,字符串  2022-03-03
  end_date: string | Date; // 结束时间
  parent: TaskId | 0; // 父节点id ,顶级的时候是0
  duration?: number; // 持续时间
  open?: boolean; // 节点是否打开
  progress: number; // 进度 0.6
  sortorder?: number; //
  originData?: M; // 原始全量数据,方便拿东西
  edit?: boolean;
}

export type GanttColumnAlign = "left" | "center" | "right";

export interface GanttColumn<T = Task> {
  name: keyof T;
  label: string;
  tree?: boolean;
  width: string | number;
  align?: GanttColumnAlign;
  template: (task: T) => any;
}

/**
 * 甘特图支持的视图类型
 */
export type GanttZoomUnit = "year" | "quarter" | "month" | "week" | "day";

export interface UseGanttCallbacks {
  beforeInitGantt?: Function; // 初始化前(数据还没进去)
  afterInitGantt?: Function; // 初始化后(数据已经进去)
  onTaskUnselected?: (id: TaskId) => void; // 任务取消选择(TODO 待测试)
  onTaskSelected?: (id: TaskId) => void; // 任务选择(TODO 待测试)
  onTaskDblClick?: (id: TaskId, evt: any) => void; // 双击任务(开始编辑)
  unmount?: Function; // 甘特图卸载
  onContextMenu?: (taskId: TaskId, linkId: any, event: any) => void;
}

export type GanttInstance = {
  nativeInstance: React.RefObject<typeof gantt | null>;
  getSelectedId: () => string;
  getSelectedTask: () => Task;
  getZoomUnit: () => string;
  addTask: (task: Task, parent?: TaskId) => string | number;
  getAllTask: () => Task[];
  removeSelectedTask: () => void;
} | null;

export type GanttTooltipText<T = any> = (
  start: Date,
  end: Date,
  task: T
) => string;
