# 使用 VS Code SFTP 插件连接远程 Linux 主机步骤

## 1. 安装 SFTP 插件

1. 打开 **VS Code**。
2. 按下 `Ctrl + Shift + X` 打开扩展面板。
3. 在搜索框中输入 `SFTP`，然后选择由 **Natizyskunk** 开发的插件。
4. 点击 **安装**。

## 2. 创建 SFTP 配置文件

1. 在 VS Code 中，按下 `Ctrl + Shift + P` 打开命令面板。
2. 输入 `SFTP: config`，选择 **SFTP: Config** 来生成 `sftp.json` 文件。该文件通常会在 `.vscode` 目录下创建。
3. 该文件用于存储 SFTP 的连接配置。

## 3. 配置 SFTP 连接

打开生成的 `sftp.json` 文件，并根据你的 Linux 主机配置填写以下内容：

```json
{
	"name": "linux服务器", // 自定义名称
	"host": "10.166.8.65", // 远程服务器的IP地址或域名
	"protocol": "sftp", // 使用sftp协议
	"port": 22, // 默认SFTP端口
	"username": "root", // 远程服务器的登录用户名
	"password": "******", // 可以使用密码，推荐使用密钥登录
	"remotePath": "/home/sailchou/Test", // 远程服务器上的目标目录，如果不存在，会自动创建
	"uploadOnSave": false, // 是否自动上传保存的文件
	"ignore": ["**/.vscode/**", "**/.git/**", "**/node_modules/**", "**/.next/**"],
	"syncOption": {
		"delete": false // 是否在同步时删除远程文件
	}
}
```

## 4. 使用密钥登录（推荐）<a id="section1"></a>

如果你希望通过 SSH 密钥进行身份验证，而不是使用密码，可以按以下步骤操作：

1. **生成 SSH 密钥对,需要 PEM key**（如果尚未生成）：先手动通过 vscode 命令面板，快捷键：`Ctrl + Shift + P` 打开输入 ：`SFTP:Open ssh in terminal` 连接到远程主机终端并运行以下命令，它将在远程主机的 `~/.ssh/` 目录中生成 `id_rsa`（私钥）和 `id_rsa.pub`（公钥）,PEM 格式的 key。

```bash
ssh-keygen -m PEM -t rsa -C "mykey"
```

2. **将公钥输出到 authorized_keys**：先切换到 `~/.ssh/`目录 ，再输入 cat 命令追加内容。

```bash
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
```

3. **下载私钥到本地主机**

```ps
scp root@10.166.8.65:~/.ssh/id_rsa "C:/Users/sailchou/.ssh/keys"
```

4. **更新 `sftp.json` 配置文件**：将 `sftp.json` 文件中的 `"privateKeyPath"` 设置为你的私钥路径（例如 `C:/Users/sailchou/.ssh/keys/id_rsa`）：

```json
"privateKeyPath": "C:/Users/sailchou/.ssh/keys/id_rsa",
"passphrase": "your-passphrase" // 如果生成密钥的时候输入了密码
```

## 5. 连接并使用 SFTP

1. 打开命令面板（`Ctrl + Shift + P`）。
2. 输入 `SFTP: Connect`，选择你刚刚创建的 SFTP 连接。
3. 成功连接后，你可以通过 **资源管理器** 查看远程文件，也可以上传、下载和编辑文件。

## 6. 手动上传和下载文件

-   **上传文件**: 右键点击文件，然后选择 `SFTP: Upload`。
-   **下载文件**: 右键点击远程文件，然后选择 `SFTP: Download`。

## 7. 常用的 SFTP 命令

按下 `Ctrl + Shift + P` 打开命令面板后，可以使用以下常用的 SFTP 命令：

-   `SFTP: Upload`: 上传当前文件。
-   `SFTP: Download`: 下载远程文件。
-   `SFTP: Sync Local -> Remote`: 将本地文件同步到远程。
-   `SFTP: Sync Remote -> Local`: 将远程文件同步到本地。

以上步骤可以帮助你使用 VS Code 的 SFTP 插件轻松连接和管理远程的 Linux 主机。
