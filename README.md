# 项目配置

## prettier

1. 安装

```shell
yarn add --dev --exact prettier
echo {}> .prettierrc.json
```

2. 配置忽略文件

.prettierignore

```t
# Ignore artifacts:
build
coverage
```

3. 配置 Pre-commit Hook

```shell
npx husky-init # add --yarn2 for Yarn 2
yarn add --dev pretty-quick
yarn husky set .husky/pre-commit "npx pretty-quick --staged"

```

4. 解决 eslint 和 Prettier 可能冲突

````
// https://github.com/prettier/eslint-config-prettier

```yarn add eslint-config-prettier eslint-plugin-prettier -D```
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
````

## eslint

```
yarn add eslint-config-ali @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-import-resolver-typescript eslint-plugin-react eslint-plugin-react-hooks -D
```

```
vscode安装Formatting Toggle
```

## commitlint

> https://github.com/conventional-changelog/commitlint

1. 安装

```shell
yarn add @commitlint/{config-conventional,cli} -D
```

2. 配置文件

```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3. 配置 Hook

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

4. 支持的类型

> https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional

```
[
  'build',
  'chore',
  'ci',
  'docs', 更新了文档
  'feat', 添加了新的功能
  'fix',
  'perf', 提升了性能
  'refactor',
  'revert',
  'style',  改了样式
  'test'
];
```

## 本地 mock 服务,使用 json-server

> https://www.npmjs.com/package/json-server

1. 安装

```shell
全局安装
npm install -g json-server
项目安装
yarn add  json-server -D
```

2. 新建静态资源

```
// db.json
{
    "users":[]
}
```

3. 启动

```shell
json-server --watch db.json
// or
 "json-server":"json-server --watch mock/db.json --port 4000",
```

### 转码

```js
decodeURIComponent(""); // 解码
encodeURIComponent(""); // 转码
```

## CRACO

```
yarn add  @craco/craco craco-less -D
```

```
"start": "craco start",
"build": "craco build",
"test": "craco test",
"eject": "react-scripts eject"
```

## vscode 插件集合

`https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks`

```
"eslintConfig": {
    "extends": [
      "eslint-config-ali/typescript/react",
      "prettier"
    ]
  },
```

## react-router

1. 安装

```
yarn add react-router-dom@6
```

> https://reactrouter.com/docs/en/v6/examples/auth

1. 根组件套上 ` <BrowserRouter>`

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

2. 开始写路由

(后台管理 layout 模式的路由一般这么写)

```tsx
// App.tsx
import GridLayout from "screens/grid-layout";
import { useBoolean } from "ahooks";

import { Route, Routes } from "react-router-dom";
import ProjectListScreen from "screens/project-list";
import Login from "screens/login";
import About from "screens/About";
import NoMatch from "screens/NoMatch";
import Home from "screens/Home";

function App() {
  const [flag, { toggle }] = useBoolean(false);
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<GridLayout />}>
          <Route index element={<Home />} />
          <Route path={"project"} element={<ProjectListScreen />} />
          <Route path={"about"} element={<About />} />
          <Route path={"*"} element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
```

#### useSearchParams

解析`http://localhost:3005/about/1?test=1` 里面的 test=1

> https://reactrouter.com/docs/en/v6/api#usesearchparams

```tsx
// 解析
function About() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("test"), "searchParams");

  return <div>About</div>;
}

export default About;
```

```tsx
//设置值
import {

  createSearchParams,
} from "react-router-dom";
 onClick={() => setSearchParams(createSearchParams({ test: "1" }))}
```

#### useParams

解析:id

> https://reactrouter.com/docs/en/v6/api#useparams

```tsx
const params = useParams();
```
