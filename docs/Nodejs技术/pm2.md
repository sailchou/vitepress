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
			},
			env_production: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=8192',
			},
		},
	],
};
```

## 6. 查看 PM2 日志

如果修改仍然没有生效，你可以查看 PM2 的日志文件，以获取更多的错误信息：

```sh
pm2 logs
```

通过这些方法，你应该能够成功应用 `ecosystem.config.js` 文件中的配置修改。
