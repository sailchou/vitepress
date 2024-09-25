# PM2

PM2 是一个非常流行的 Node.js 进程管理工具，用于在生产环境中运行和监控 Node.js 应用程序。它提供了多种功能，帮助开发者更好地管理和优化他们的应用程序,pm2 能做的其实有很多,比如监听文件改动自动重启,统一管理多个进程,内置的负载均衡,日志系统等等。

## 主要功能

-   进程管理：PM2 可以轻松地启动、停止、重启和删除 Node.js 应用程序进程。它支持启动多个进程以利用多核 CPU，提高应用的性能和稳定性。
-   负载均衡：通过集群模式，PM2 可以创建多个应用实例并自动进行负载均衡，确保应用在高并发情况下仍能稳定运行。
-   自动重启：当应用程序崩溃或出现错误时，PM2 能自动重启应用，确保服务的高可用性。
-   日志管理：PM2 提供了全面的日志管理功能，可以方便地查看、合并和分析应用程序的日志信息。
-   监控和性能分析：PM2 内置监控功能，可以实时查看应用程序的性能指标（如 CPU 和内存使用情况）。此外，PM2 还集成了 Keymetrics，这是一个专门用于 Node.js 应用的性能监控和管理平台。
-   配置文件支持：PM2 支持通过 JSON 文件或 JavaScript 文件进行配置，便于管理多个应用和环境配置。
-   热重载：在不停止服务的情况下，PM2 可以重新加载应用代码，从而减少停机时间。
-   容器支持：PM2 可以与 Docker 等容器技术很好地集成，方便在容器化环境中管理 Node.js 应用。

## 安装使用

安装 pm2

```bash
npm install pm2 -g
```

使用 pm2 启动服务

```bash
pm2 start app.js xx.js bb.js [--env production]
```

查看当前运行的 pm2 进程

```bash
pm2 list
```

或者

```bash
pm2 status
```

停止 pm2 进程

```bash
pm2 stop app.js
```

重启服务

```bash
pm2 restart app.js
```

删除 pm2 进程

```bash
pm2 delete app.js
```

查看日志

```bash
pm2 logs
```

清理日志

```bash
pm2 flush
```

## 设置开机启动

-   **linux**

    1. 先运行一个脚本如 pm2 start app.js
    2. 保存进程信息 pm2 save
    3. 生成启动脚本 pm2 startup
    4. 开机自启命令 pm2 startup systemd
    5. 保存自启命令 pm2 save
    6. 删除自动启动 pm2 unstartup systemd
    7. 保存删除启动 pm2 save

-   **windows**

    1. 安装 windows 自动启动包 npm install pm2-windows-startup -g
    2. 安装自启脚本 pm2-startup install
    3. 启动服务 pm2 start xxxx
    4. 保存自启服务 pm2 save
    5. 删除自动启动 pm2-startup uninstall

## 负载均衡

使用 pm2 部署应用最重点的一点是，可以使用它的负载均衡能力，在 cluster 模式启动应用，可以同时开启多个应用的实例，实现高并发的应用，提高资源利用率。

```bash
pm2 start index.js -i [max | number]
```

可以指定经线程数量，也可以设置 max 直接设置最高

## 性能监控

可以实时监控所有由 PM2 管理的进程。这个监控面板提供了丰富的实时数据，包括 CPU 使用率、内存使用情况、重启次数、日志输出等信息

```bash
pm2 monit
```

## 配置文件

调用下面命令在项目中生成配置文件 ecosystem.config.js 或者手动创建也可以件

```bash
pm2 init simple
```

生成 `ecosystem.config.js` 文件

```js
apps: [
	{
		name: 'my-app',
		script: './app.js',
		instances: 4,
		exec_mode: 'cluster',
		watch: true,
		autorestart: true,
		max_memory_restart: '200M',
		env: {
			NODE_ENV: 'development',
			PORT: 3000,
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 8080,
		},
	},
];
```

-   apps：一个包含应用程序配置对象的数组，每个对象代表一个应用程序。
-   name：应用程序名称，用于在 PM2 中标识。
-   script：要启动的脚本文件路径。
-   instances：实例数量，可以是具体数字或者 max，以利用所有可用的 CPU 核心。
-   autorestart：自动重启。
-   exec_mode：执行模式，常用值有 fork（默认）和 cluster。
-   watch：启用文件监视，如果文件有变化，应用会自动重启。
-   max_memory_restart：当内存使用超过指定值时自动重启应用。
-   env：普通环境变量配置。
-   env_production：生产环境变量配置，使用 pm2 start ecosystem.config.js --env production 命令启动时生效。

启用配置文件启动应用

```bash
pm2 start ecosystem.config.js --env production
```

## 踩坑记录

在使用 PM2 启动项目时，如果你修改了 `ecosystem.config.js` 文件中的配置（例如将 `instances` 从 2 修改为 4），但发现修改没有生效，通常是因为 PM2 没有重新加载配置文件。为了使修改生效，你需要重新加载或重新启动 PM2 管理的应用程序。

另外一个坑点是，在用 pm2 部署 nextjs 应用时，因为不是直接启动 xxx.js 这样的脚本，而是使用了 nextjs 的命令行工具 `next`，所以无法直接启动项目。需要找到 next 脚本的目录 `./node_modules/next/dist/bin/next`，修改 `ecosystem.config.js` 中的 `script` 为 `./node_modules/next/dist/bin/next`,args 为 `start`,然后重新启动应用程序。

以下是一些常见的方法来处理这种情况：

### 1. 重新启动应用程序

你可以使用 `pm2 restart` 命令来重新启动应用程序，并应用新的配置：

```sh
pm2 restart ecosystem.config.js
```

### 2. 重新加载配置文件

你可以使用 `pm2 reload` 命令来重新加载配置文件，这通常会应用新的配置：

```sh
pm2 reload ecosystem.config.js
```

### 3. 删除并重新启动

如果上述方法没有生效，你可以先删除现有的应用程序，然后重新启动：

```sh
pm2 delete all
pm2 start ecosystem.config.js
```

### 4. 使用 `pm2 deploy`

如果你使用的是 PM2 的部署功能，你可以使用 `pm2 deploy` 命令来重新部署应用程序，这会应用新的配置：

```sh
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production
```

### 5. 检查配置文件

确保你的 `ecosystem.config.js` 文件格式正确，并且没有语法错误。以下是一个示例配置文件：

```javascript
module.exports = {
	apps: [
		{
			name: 'my-app',
			script: './node_modules/next/dist/bin/next',
			args: 'start',
			instances: 4,
			exec_mode: 'cluster',
			watch: false,
			max_memory_restart: '200M',
			autorestart: true,
			env: {
				NODE_ENV: 'development',
				NODE_OPTIONS: '--max-old-space-size=8192',
				PORT: 8000,
				HOST: '0.0.0.0',
			},
			env_production: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=8192',
				PORT: 8001,
				HOST: '0.0.0.0',
			},
		},
	],
};
```

这样配置之后我们执行 pm2 start ecosystem.config.js，默认是使用的 env 配置，所以我们可以在 8000 端口访问到 node 应用；如果需要部署生产环境那么需要加一个 env 参数：`pm2 start ecosystem.config.js --env production`，一顿操作之后 8000 无法访问了，8001 可以访问了，测试环境部署成功！这样我们的 pm2 应用就部署成功了！部署成功之后难免有时候会出现问题，或者某些接口报错了，这个时候我们需要进行故障排查。

### 6. 查看 PM2 日志

如果修改仍然没有生效，你可以查看 PM2 的日志文件，以获取更多的错误信息：

```sh
pm2 logs
```

通过这些方法，你应该能够成功应用 `ecosystem.config.js` 文件中的配置修改。
