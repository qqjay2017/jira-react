import React from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "constant";
import { ProjectModel, UserModel } from "types";
import { qsStringify } from "utils/qs";
import { cleanObject } from "utils";
import { useMount } from "hooks/useMount";
import { useDebounceParam } from "hooks/useDebounce";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState<ProjectModel[]>([]);
  const debouncedParam = useDebounceParam(param, 1000);

  useEffect(() => {
    fetch(
      `${apiBaseUrl}/projects?${qsStringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiBaseUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
