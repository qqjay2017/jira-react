import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { ProjectModel, UserModel } from "types";

type ProjectTableProps = TableProps<ProjectModel>;

interface ListProps extends ProjectTableProps {
  users: UserModel[];
}

export const List = ({ users, ...tableProps }: ListProps) => {
  const columns: ProjectTableProps["columns"] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "负责人",
      dataIndex: "personId",
      render: (text) => {
        return (
          <span>{users.find((user) => user.id === text)?.name || "未知"}</span>
        );
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "created",
      dataIndex: "created",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
  ];

  return (
    <div>
      <Table
        rowKey={"id"}
        pagination={false}
        columns={columns}
        {...tableProps}
      />
    </div>
  );
};
