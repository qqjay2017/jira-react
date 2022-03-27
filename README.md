# 项目配置

## prettier

1. 安装

```
yarn add --dev --exact prettier
echo {}> .prettierrc.json


```

2. 配置忽略文件

.prettierignore

```
# Ignore artifacts:
build
coverage
```

3. 配置 Pre-commit Hook

```
npx husky-init # add --yarn2 for Yarn 2
yarn add --dev pretty-quick
yarn husky set .husky/pre-commit "npx pretty-quick --staged"

```

4. 解决 eslint 和 Prettier 可能冲突

```
// https://github.com/prettier/eslint-config-prettier
yarn add eslint-config-prettier -D

{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

## commitlint
