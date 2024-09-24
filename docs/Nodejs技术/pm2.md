# pm2 部署遇到的坑点

在使用 PM2 启动项目时，如果你修改了 `ecosystem.config.js` 文件中的配置（例如将 `instances` 从 2 修改为 4），但发现修改没有生效，通常是因为 PM2 没有重新加载配置文件。为了使修改生效，你需要重新加载或重新启动 PM2 管理的应用程序。

以下是一些常见的方法来处理这种情况：

## 1. 重新启动应用程序

你可以使用 `pm2 restart` 命令来重新启动应用程序，并应用新的配置：

```sh
pm2 restart ecosystem.config.js
```

## 2. 重新加载配置文件

你可以使用 `pm2 reload` 命令来重新加载配置文件，这通常会应用新的配置：

```sh
pm2 reload ecosystem.config.js
```

## 3. 删除并重新启动

如果上述方法没有生效，你可以先删除现有的应用程序，然后重新启动：

```sh
pm2 delete all
pm2 start ecosystem.config.js
```

## 4. 使用 `pm2 deploy`

如果你使用的是 PM2 的部署功能，你可以使用 `pm2 deploy` 命令来重新部署应用程序，这会应用新的配置：

```sh
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production
```

## 5. 检查配置文件

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

这样配置之后我们执行 pm2 start ecosystem.config.js，默认是使用的 env 配置，所以我们可以在 8001 端口访问到 node 应用；如果需要部署测试环境那么需要加一个 env 参数：`pm2 start ecosystem.config.js --env development`，一顿操作之后 8001 无法访问了，8000 可以访问了，测试环境部署成功！这样我们的 pm2 应用就部署成功了！部署成功之后难免有时候会出现问题，或者某些接口报错了，这个时候我们需要进行故障排查

## 6. 查看 PM2 日志

如果修改仍然没有生效，你可以查看 PM2 的日志文件，以获取更多的错误信息：

```sh
pm2 logs
```

通过这些方法，你应该能够成功应用 `ecosystem.config.js` 文件中的配置修改。
