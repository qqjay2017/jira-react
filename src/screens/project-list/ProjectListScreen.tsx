import React, { useContext, useEffect, useState } from "react";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
// import { apiBaseUrl } from "constant";
import { ProjectModel, UserModel } from "types";
// import { qsStringify } from "utils/qs";
// import { cleanObject } from "utils";
// import { useMount } from "hooks/useMount";
// import { useDebounceParam } from "hooks/useDebounce";
// import { useAuth } from "context/authContext";
import { useRequest } from "ahooks";
import api from "common/api";

export const ProjectListScreen = () => {
  // const context = useAuth();
  // console.log(context, "context");
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  // useEffect(() => {
  //   fetch(
  //     `${apiBaseUrl}/projects?${qsStringify(cleanObject(debouncedParam))}`
  //   ).then(async (response) => {
  //     if (response.ok) {
  //       setList(await response.json());
  //     }
  //   });
  // }, [debouncedParam]);

  // 单独请求
  const { data: users, loading } = useRequest(
    () => api.invoke<UserModel[]>("get", "/users"),
    {}
  );
  // 依赖页面参数进行请求
  const {
    data: list,
    run: runProjectReq,
    loading: projectLoading,
  } = useRequest(
    () => {
      // console.log(p, "pppp");

      return api.invoke<ProjectModel[]>("get", "/projects", param);
    },
    {
      // debounceWait: 500,
      manual: false,
      refreshDeps: [param],
      loadingDelay: 1,
      refreshOnWindowFocus: true,
    }
  );

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {String(projectLoading)}
      <List list={list || []} users={users || []} />
      <button onClick={() => runProjectReq()}>btn</button>
    </div>
  );
};
