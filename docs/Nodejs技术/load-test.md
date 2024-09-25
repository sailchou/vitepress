# 压力测试

当部署好网站后，可以使用压力测试来测试网站的性能。顺便可以测试用 `pm2` 部署的 `nodejs` 应用 `cluster` 集群模式下 与在 普通模式下 之间的性能差异。

## 准备工作

在压力测试开始前，我们需要安装 loadtest 压力测试工具。

```sh
npm install loadtest -g
```

## 执行命令

我们的网站使用 `pm2` 部署在 `http://10.166.8.65:3000`，先修改 `ecosystem.config.js` 中的 `instances` 为 `1`

```javascript
module.exports = {
	apps: [
		{
			name: 'precipitation-hour-minutes-analyse',
			script: './node_modules/next/dist/bin/next',
			args: 'start',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=8192',
			},
			env_production: {
				NODE_ENV: 'production',
				NODE_OPTIONS: '--max-old-space-size=8192',
			},
		},
		{
			name: 'precipitation-hour-minutes-schedule',
			script: './src/schedule/index.mjs',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			cron_restart: '0 0 * * *',
			env: {
				NODE_ENV: 'production',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
};
```

执行以下命令,以下命令会删除所有的应用程序，并重启应用程序

```bash
pm2 delete all
pm2 start ecosystem.config.js --env production
```

然后执行以下测试命令

```sh
loadtest http://10.166.8.65:3000 -n 10000 -c 100
```

`-c` 表示并发用户数或并发连接数。在这种情况下，`-c 100` 表示在进行负载测试时，同时模拟 100 个并发用户或建立 100 个并发连接

`-n` 表示总请求数或总请求数量。在这种情况下，`-n 10000` 表示在进行负载测试时，将发送总共 10000 个请求到目标网站

## 测试结果

当 `instances` 为 `1` 时，我们可以看到如下的结果：

```bash
Target URL:          http://10.166.8.65:3000
Max requests:        10000
Concurrent clients:  400
Running on cores:    4
Agent:               none

Completed requests:  10000
Total errors:        0
Total time:          147.955 s
Mean latency:        5899.8 ms
Effective rps:       68

Percentage of requests served within a certain time
  50%      5487 ms
  90%      5711 ms
  95%      5802 ms
  99%      15844 ms
 100%      16052 ms (longest request)
```

修改 `ecosystem.config.js` 中 `instances` 为 `8` 并且重启应用（设置为 `'max'` 则按 cpu 核心数启动实例个数），执行以下命令，会显示当前应用程序有 8 个 cluster 实例

```bash
pm2 start ecosystem.config.js`
pm2 status
⇆ PM2+ activated | Instance Name: localhost.localdomain-b757 | Dash: https://app.pm2.io/#/r/3k932mxbv2ls9s0
┌────┬────────────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name                                   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775227  │ 4m     │ 0    │ online    │ 0%       │ 115.3mb  │ root     │ disabled │
│ 2  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775241  │ 4m     │ 0    │ online    │ 0%       │ 112.3mb  │ root     │ disabled │
│ 3  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775251  │ 4m     │ 0    │ online    │ 0%       │ 114.3mb  │ root     │ disabled │
│ 4  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775258  │ 4m     │ 0    │ online    │ 0%       │ 115.0mb  │ root     │ disabled │
│ 5  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775269  │ 4m     │ 0    │ online    │ 0%       │ 114.4mb  │ root     │ disabled │
│ 6  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775280  │ 4m     │ 0    │ online    │ 0%       │ 113.5mb  │ root     │ disabled │
│ 7  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775291  │ 4m     │ 0    │ online    │ 0%       │ 115.1mb  │ root     │ disabled │
│ 8  │ precipitation-hour-minutes-analyse     │ default     │ 14.2.5  │ cluster │ 1775302  │ 4m     │ 0    │ online    │ 0%       │ 113.7mb  │ root     │ disabled │
│ 1  │ precipitation-hour-minutes-schedule    │ default     │ 0.1.0   │ cluster │ 1775228  │ 4m     │ 0    │ online    │ 0%       │ 83.0mb   │ root     │ disabled │
└────┴────────────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

执行相同的测试命令，我们可以看到如下的结果：

```bash
Target URL:          http://10.166.8.65:3000
Max requests:        10000
Concurrent clients:  400
Running on cores:    4
Agent:               none

Completed requests:  10000
Total errors:        0
Total time:          31.797 s
Mean latency:        1246.6 ms
Effective rps:       314

Percentage of requests served within a certain time
  50%      1177 ms
  90%      1593 ms
  95%      1797 ms
  99%      2223 ms
 100%      2694 ms (longest request)

```

## 总结

从结果可以看出，使用 pm2 的 cluster 模式来部署 web 应用，可以显著地降低延时，提高应用并发能力和吞吐量，进而提升系统整体资源利用率。
