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
