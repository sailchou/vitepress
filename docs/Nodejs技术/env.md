# nodejs 应用中的环境变量

## linux 中查看与设置

在 Linux 系统中，你可以使用以下几种方法来查看环境变量 `NODE_ENV` 和 `NODE_OPTIONS`：

### 方法一：使用 `printenv` 命令

`printenv` 命令可以打印当前环境中的所有变量，或者指定的变量。

```sh
printenv NODE_ENV
printenv NODE_OPTIONS
```

### 方法二：使用 `echo` 命令

`echo` 命令可以直接打印环境变量的值。

```sh
echo $NODE_ENV
echo $NODE_OPTIONS
```

### 方法三：使用 `env` 命令

`env` 命令可以打印所有的环境变量，你可以通过管道和 `grep` 命令来过滤特定的变量。

```sh
env | grep NODE_ENV
env | grep NODE_OPTIONS
```

### 方法四：在脚本或程序中查看

如果你在一个脚本或程序中需要查看这些环境变量，可以使用以下方法：

#### 在 Bash 脚本中

```sh
#!/bin/bash
echo "NODE_ENV: $NODE_ENV"
echo "NODE_OPTIONS: $NODE_OPTIONS"
```

#### 在 Node.js 程序中

```javascript
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
```

### 设置环境变量

如果你需要设置这些环境变量，可以在终端中使用 `export` 命令：

```sh
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=4096"
```

或者在你的 `.bashrc` 或 `.bash_profile` 文件中添加这些行，以便在每次登录时自动设置这些变量。

### 查看环境变量文件

有时环境变量可能在某些配置文件中设置，例如 `.bashrc`、`.bash_profile` 或 `.profile`。你可以使用 `cat` 或 `less` 命令来查看这些文件。

```sh
cat ~/.bashrc
cat ~/.bash_profile
cat ~/.profile
```

通过这些方法，你可以方便地查看和管理 `NODE_ENV` 和 `NODE_OPTIONS` 环境变量。

## windows 中查看与设置

在 Windows 系统中，你可以使用以下几种方法来查看环境变量 `NODE_ENV` 和 `NODE_OPTIONS`：

### 方法一：使用命令提示符（CMD）

在命令提示符中，你可以使用 `echo` 命令来查看环境变量的值。

```cmd
echo %NODE_ENV%
echo %NODE_OPTIONS%
```

### 方法二：使用 PowerShell

在 PowerShell 中，你可以使用 `$env:` 前缀来查看环境变量的值。

```powershell
echo $env:NODE_ENV
echo $env:NODE_OPTIONS
```

### 方法三：使用系统属性

你也可以通过图形界面来查看环境变量：

1. 右键点击“此电脑”或“我的电脑”，选择“属性”。
2. 点击“高级系统设置”。
3. 在“系统属性”窗口中，点击“环境变量”按钮。
4. 在“环境变量”窗口中，你可以查看用户变量和系统变量。

### 设置环境变量

如果你需要设置这些环境变量，可以在命令提示符或 PowerShell 中使用 `set` 或 `$env:` 命令：

#### 在命令提示符中

```cmd
set NODE_ENV=production
set NODE_OPTIONS=--max-old-space-size=4096
```

#### 在 PowerShell 中

```powershell
$env:NODE_ENV="production"
$env:NODE_OPTIONS="--max-old-space-size=4096"
```

### 查看环境变量文件

在 Windows 中，环境变量通常不会存储在单独的文件中，而是通过系统设置来管理。你可以通过上述图形界面方法来查看和编辑环境变量。

### 在脚本或程序中查看

如果你在一个脚本或程序中需要查看这些环境变量，可以使用以下方法：

#### 在 Batch 脚本中

```batch
@echo off
echo NODE_ENV: %NODE_ENV%
echo NODE_OPTIONS: %NODE_OPTIONS%
```

#### 在 PowerShell 脚本中

```powershell
Write-Output "NODE_ENV: $env:NODE_ENV"
Write-Output "NODE_OPTIONS: $env:NODE_OPTIONS"
```

#### 在 Node.js 程序中

```javascript
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
```

通过这些方法，你可以方便地查看和管理 `NODE_ENV` 和 `NODE_OPTIONS` 环境变量。

## pm2 中设置和管理环境变量

在使用 PM2 管理 Node.js 应用程序时，你可以通过多种方式设置环境变量。以下是几种常见的方法：

### 方法一：使用 `ecosystem.config.js` 文件

`ecosystem.config.js` 文件是 PM2 的配置文件，你可以在其中定义环境变量。

1. 创建或编辑 `ecosystem.config.js` 文件：

```javascript
module.exports = {
	apps: [
		{
			name: 'my-app',
			script: './app.js',
			env: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=4096',
			},
			env_production: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=4096',
			},
			env_development: {
				NODE_ENV: 'development',
				NODE_OPTIONS: '--max-old-space-size=2048',
			},
		},
	],
};
```

2. 使用 `ecosystem.config.js` 文件启动应用程序：

```sh
pm2 start ecosystem.config.js --env production
```

### 方法二：使用命令行参数

你可以在启动应用程序时通过命令行参数设置环境变量。

```sh
pm2 start app.js --node-args="--max-old-space-size=4096" --env NODE_ENV=production
```

### 方法三：使用 `.env` 文件

你可以使用 `.env` 文件来管理环境变量，并在启动应用程序时加载这些变量。

1. 创建 `.env` 文件：

```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=4096
```

2. 使用 `dotenv` 模块加载 `.env` 文件：

```javascript
require('dotenv').config();
```

3. 启动应用程序：

```sh
pm2 start app.js
```

### 方法四：使用 PM2 的 `--env` 选项

你可以在 `ecosystem.config.js` 文件中定义多个环境，并使用 `--env` 选项来选择启动的环境。

1. 在 `ecosystem.config.js` 文件中定义多个环境：

```javascript
module.exports = {
	apps: [
		{
			name: 'my-app',
			script: './app.js',
			env_production: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=4096',
			},
			env_development: {
				NODE_ENV: 'development',
				NODE_OPTIONS: '--max-old-space-size=2048',
			},
		},
	],
};
```

2. 使用 `--env` 选项启动应用程序：

```sh
pm2 start ecosystem.config.js --env production
```

## pm2 启动 nextjs 应用

使用 PM2 启动 Next.js 应用程序并指定端口号和监听地址，可以通过以下几种方法实现：

### 方法一：使用 `ecosystem.config.js` 文件

`ecosystem.config.js` 文件是 PM2 的配置文件，你可以在其中定义启动参数。

1. 创建或编辑 `ecosystem.config.js` 文件：

```javascript
module.exports = {
	apps: [
		{
			name: 'nextjs-app',
			script: './node_modules/next/dist/bin/next',
			args: 'start',
			env: {
				PORT: 3000,
				HOST: '0.0.0.0',
			},
		},
	],
};
```

2. 使用 `ecosystem.config.js` 文件启动应用程序：

```sh
pm2 start ecosystem.config.js
```

### 方法二：使用命令行参数

你可以在启动应用程序时通过命令行参数设置端口号和监听地址。

```sh
pm2 start npm --name "nextjs-app" -- start -- --port 3000 --hostname 0.0.0.0
```

### 方法三：使用 `.env` 文件

你可以使用 `.env` 文件来管理环境变量，并在启动应用程序时加载这些变量。

1. 创建 `.env` 文件：

```
PORT=3000
HOST=0.0.0.0
```

2. 使用 `dotenv` 模块加载 `.env` 文件（在你的 Next.js 应用程序中）：

```javascript
require('dotenv').config();
```

3. 启动应用程序：

```sh
pm2 start npm --name "nextjs-app" -- start
```

### 方法四：使用 `next.config.js` 文件

你可以在 `next.config.js` 文件中配置端口号和监听地址。

1. 创建或编辑 `next.config.js` 文件：

```javascript
module.exports = {
	serverRuntimeConfig: {
		// 你可以在这里定义其他配置
	},
	publicRuntimeConfig: {
		// 你可以在这里定义其他配置
	},
	dev: {
		host: '0.0.0.0',
		port: 3000,
	},
};
```

2. 启动应用程序：

```sh
pm2 start npm --name "nextjs-app" -- start
```

### 方法五：使用自定义启动脚本

你可以创建一个自定义启动脚本来设置端口号和监听地址。

1. 创建一个启动脚本，例如 `start.js`：

```javascript
const { exec } = require('child_process');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

exec(`next start -p ${port} -H ${host}`, (error, stdout, stderr) => {
	if (error) {
		console.error(`Error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.error(`Stderr: ${stderr}`);
		return;
	}
	console.log(`Stdout: ${stdout}`);
});
```

2. 使用 PM2 启动自定义脚本：

```sh
pm2 start start.js --name "nextjs-app" --env PORT=3000 HOST=0.0.0.0
```

通过这些方法，你可以方便地使用 PM2 启动 Next.js 应用程序，并指定端口号和监听地址。
