import React from "react";
import { ProjectModel, UserModel } from "types";
export const List = ({
  list,
  users,
}: {
  list: ProjectModel[];
  users: UserModel[];
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.name}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
