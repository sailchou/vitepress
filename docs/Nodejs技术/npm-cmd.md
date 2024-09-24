# npm 命令说明

## npm 是什么

npm 是 Node.js 官方提供的包管理工具，他已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

## 为什么使用 npm

-   允许用户从 npm 服务器下载别人编写的第三方包到本地使用。
-   允许用户从 npm 服务器下载并安装别人编写的命令行程序到本地使用。
-   允许用户将自己编写的包或命令行程序上传到 npm 服务器供别人使用。
-   将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。

**简单来说**：npm 是 node.js 提供的包管理工具，可以让开发者下载或上传可以复用的代码。

## npm 本地安装

1. npm 在默认情况下会从 npmjs.org 搜索或下载包，将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
2. 可以通过 require() 来引入本地安装的包。
3. 本地安装指的是将一个模块下载到当前项目的 node_modules 子目录，然后只有在项目目录之中，才能调用这个模块。

```sh
npm install <package-name> --save
```

或者

```sh
npm install <package-name> --save-dev
```

## npm 全局安装

1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
2. 可以直接在命令行里使用。

```sh
npm install <package-name> --global
```

## npm 常用命令

-   `npm install`: 安装包。
-   `npm uninstall`: 卸载包。
-   `npm update`: 更新包。
-   `npm publish`: 发布包。
-   `npm run`: 运行包。
-   `npm list`: 列出包。
-   `npm cache clean`: 清空缓存。
-   `npm cache verify`: 验证缓存。
-   `npm audit`: 审核包。
-   `npm audit fix`: 修复包。
-   `npm help`: 帮助命令。
-   `npm config`: 配置命令。
-   `npm cache`: 缓存命令。
-   `npm whoami`: 你的 npm 用户名
-   `npm version`: 版本命令。
-   `npm config set <key>=<value> [<key>=<value> ...]`: 设置 npm 配置。
-   `npm config get [<key> [<key> ...]]`: 获取 npm 配置。
-   `npm config delete <key> [<key> ...]`: 删除 npm 配置。
-   `npm config list [--json]`: 列出 npm 配置。
-   `npm config edit`: 编辑 npm 配置。
-   `npm config fix`: npm config fix

> –-save：模块名将被添加到 dependencies，可以简化为参数-S。
> –-save-dev：模块名将被添加到 devDependencies，可以简化为参数-D。
> --global：将安装包放在 /usr/local 下或者你 node 的安装目录，可以简化为参数-g。

## npm 常用命令举例

```sh
npm install express
```

```sh
npm install express --save
```

```sh
npm install vite --save-dev
```

```sh
npm install pm2 --global
```

```sh
npm config set registry https://registry.npm.taobao.org
```

```sh
npm config get registry
```

```sh
npm config delete registry
```

```sh
npm config list
```

```sh
npm config set http-proxy http://127.0.0.1:8080
npm config set https-proxy http://127.0.0.1:8080
```

```sh
npm config get http-proxy
npm config get https-proxy
```

```sh
npm config delete http-proxy
npm config delete https-proxy
```
