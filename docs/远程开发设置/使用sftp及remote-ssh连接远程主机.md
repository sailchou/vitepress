# VSCode 远程开发设置

## 使用 VS Code SFTP 插件连接远程 Linux 主机步骤

### 1. 安装 SFTP 插件

1. 打开 **VS Code**。
2. 按下 `Ctrl + Shift + X` 打开扩展面板。
3. 在搜索框中输入 `SFTP`，然后选择由 **Natizyskunk** 开发的插件。
4. 点击 **安装**。

### 2. 创建 SFTP 配置文件

1. 在 VS Code 中，按下 `Ctrl + Shift + P` 打开命令面板。
2. 输入 `SFTP: config`，选择 **SFTP: Config** 来生成 `sftp.json` 文件。该文件通常会在 `.vscode` 目录下创建。
3. 该文件用于存储 SFTP 的连接配置。

### 3. 配置 SFTP 连接

打开生成的 `sftp.json` 文件，并根据你的 Linux 主机配置填写以下内容：

```json
{
	"name": "国债项目开发linux服务器", // 自定义名称
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

### 4. 使用密钥登录（推荐）<a id="section1"></a>

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

### 5. 连接并使用 SFTP

1. 打开命令面板（`Ctrl + Shift + P`）。
2. 输入 `SFTP: Connect`，选择你刚刚创建的 SFTP 连接。
3. 成功连接后，你可以通过 **资源管理器** 查看远程文件，也可以上传、下载和编辑文件。

### 6. 手动上传和下载文件

-   **上传文件**: 右键点击文件，然后选择 `SFTP: Upload`。
-   **下载文件**: 右键点击远程文件，然后选择 `SFTP: Download`。

### 7. 常用的 SFTP 命令

按下 `Ctrl + Shift + P` 打开命令面板后，可以使用以下常用的 SFTP 命令：

-   `SFTP: Upload`: 上传当前文件。
-   `SFTP: Download`: 下载远程文件。
-   `SFTP: Sync Local -> Remote`: 将本地文件同步到远程。
-   `SFTP: Sync Remote -> Local`: 将远程文件同步到本地。

以上步骤可以帮助你使用 VS Code 的 SFTP 插件轻松连接和管理远程的 Linux 主机。

## 使用 VS Code Remote-SSH 插件连接远程 Linux 主机的步骤

### 1. 安装 Remote-SSH 插件

1. 打开 **VS Code**。
2. 按下 `Ctrl + Shift + X` 打开扩展面板。
3. 在搜索框中输入 `Remote - SSH`。
4. 找到 **Remote - SSH** 插件（由 Microsoft 开发）并点击 **安装**。
5. 如果你还需要编辑远程容器，或者调试远程项目，也可以同时安装 `Remote - SSH: Editing Configuration Files` 和 `Remote - SSH: Explorer` 插件。

### 2. 配置 SSH 密钥，

参考前一章 点击 [这里](#section1) 查看。

> 4.使用密钥登录（推荐）

### 3. 使用 Remote-SSH 插件连接到远程主机

1. 按下 `Ctrl + Shift + P` 打开命令面板。
2. 输入并选择 `Remote-SSH: Connect to Host`。
3. 第一次连接时，选择 **Add New SSH Host**，并输入以下格式的 SSH 命令：
    ```bash
    ssh root@10.166.8.65
    ```
4. 提示输入 SSH 密码，或者如果已经配置密钥登录，则会直接登录。

5. **保存 SSH 主机信息**：系统会提示你选择保存 SSH 主机的配置文件路径，通常为 `~/.ssh/config` 文件。可以为不同的主机配置不同的别名和连接选项。

### 4. 配置 SSH Config 文件（可选）

你可以通过编辑 `~/.ssh/config` 文件来管理多个远程主机的连接信息。打开 VS Code 或文本编辑器，编辑 `~/.ssh/config` 文件，添加以下内容：

```bash
Host my-linux-server
    HostName 10.166.8.65           # 远程服务器的IP地址或域名
    User root                       # 远程服务器的登录用户名
    IdentityFile "C:/Users/sailchou/.ssh/keys/id_rsa"         # 私钥文件路径
    Port 22                            # SSH端口，默认是22
```

### 5. 重新连接远程主机

1. 打开命令面板（`Ctrl + Shift + P`），再次选择 `Remote-SSH: Connect to Host`。
2. 你会看到之前配置的主机名称，例如 `my-linux-server`。点击该主机即可连接。

### 6. 使用远程工作空间

成功连接远程主机后，VS Code 将会打开一个新的窗口，并且所有的操作都在远程主机上进行。你可以：

-   **直接编辑远程文件**：通过资源管理器浏览远程主机的文件，并在 VS Code 中直接编辑它们。
-   **在远程主机上运行命令**：通过 VS Code 的终端，运行在远程主机上的命令。

### 7. 使用 Remote-SSH 命令

按下 `Ctrl + Shift + P` 打开命令面板，输入以下常用命令：

-   `Remote-SSH: Connect to Host`: 连接到指定的远程主机。
-   `Remote-SSH: Open SSH Configuration File`: 打开并编辑 SSH 配置文件。
-   `Remote-SSH: Kill VS Code Server on Host`: 关闭远程主机上运行的 VS Code 服务器。

### 8. 断开连接

1. 要断开与远程主机的连接，可以关闭 VS Code 窗口。
2. 或者打开命令面板，选择 `Remote-SSH: Close Remote Connection` 来断开连接。

通过以上步骤，你可以使用 VS Code 的 Remote-SSH 插件轻松连接并管理远程 Linux 主机上的项目。

## 使用 VS Code Remote-SSH 插件连接远程 Linux 主机遇到的坑点

### 提示端口转发失败无法连接

解决办法：修改远程主机的 ssh 文件配置，修改完后重启 sshd，修改的配置项为 `AllowTcpForwarding yes`，如果该项被注释掉了，取消注释即可。还有比如无法用密钥登录的问题，也是通过修改这 ssh 配置文件中的配置可以解决。

```bash
vi /etc/ssh/ssh_config
vi /etc/ssh/sshd_config
sudo systemctl restart sshd
```

### 网络问题无法正常安装项目依赖

没有科学上网环境，无法正常安装很多软件依赖时，可以将本地主机当作代理设置给远程主机使用， 使用`export`命令可以临时设置环境变量，这些变量在当前会话中有效，关闭终端后将不再生效。以下是如何使用`export`命令临时设置代理的步骤。

#### 1. 设置 HTTP 和 HTTPS 代理

你可以使用以下命令临时设置 HTTP 和 HTTPS 代理：

```bash
export http_proxy="http://proxy_server:proxy_port"
export https_proxy="http://proxy_server:proxy_port"
```

替换`proxy_server`和`proxy_port`为你的代理服务器地址和端口。

#### 2. 设置 FTP 代理

如果你还需要设置 FTP 代理，可以使用以下命令：

```bash
export ftp_proxy="http://proxy_server:proxy_port"
```

#### 3. 设置不使用代理的主机

你可以设置不通过代理的主机列表：

```bash
export no_proxy="localhost,127.0.0.1,::1"
```

#### 4. 验证代理设置

你可以使用以下命令验证代理设置是否生效：

```bash
echo $http_proxy
echo $https_proxy
echo $ftp_proxy
echo $no_proxy
```

#### 5. 示例

假设你的代理服务器地址是`192.168.1.1`，端口是`8080`，你可以使用以下命令设置代理：

```sh
export http_proxy="http://192.168.1.1:8080"
export https_proxy="http://192.168.1.1:8080"
export ftp_proxy="http://192.168.1.1:8080"
export no_proxy="localhost,127.0.0.1,::1"
```

#### 6. 取消代理设置

如果你想取消代理设置，可以使用以下命令：

```sh
unset http_proxy
unset https_proxy
unset ftp_proxy
unset no_proxy
```

#### 7. 使用代理的示例命令

设置代理后，你可以使用以下命令测试代理是否生效：

```sh
curl -I http://example.com
```

或者使用`wget`：

```sh
wget http://example.com
```

通过以上步骤，你可以临时设置代理，并在当前会话中使用它们。关闭终端后，这些设置将不再生效。**也可以写入系统环境变量中，使代理设置长期有效。**

#### 8. 设置系统范围的代理

你可以通过设置环境变量来为系统范围的应用程序配置代理。编辑`/etc/environment`文件或在`~/.bashrc`文件中添加以下行：

```sh
export http_proxy="http://proxy_server:proxy_port"
export https_proxy="http://proxy_server:proxy_port"
export ftp_proxy="http://proxy_server:proxy_port"
export no_proxy="localhost,127.0.0.1,::1"
```

然后执行：

```bash
source ~/.bashrc
```

替换`proxy_server`和`proxy_port`为你的代理服务器地址和端口。

### 使用 fnm 安装 nodejs 环境，需要科学上网

#### 1. installs fnm (Fast Node Manager)

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

#### 2. activate fnm

```bash
source ~/.bashrc
```

#### 3. download and install Node.js

```bash
fnm use --install-if-missing 20
```

#### 4. verifies the right Node.js version is in the environment

```bash
node -v
```

should print `v20.17.0`

#### 5. verifies the right npm version is in the environment

```bash
npm -v
```

should print `10.8.2`
