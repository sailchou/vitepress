# 使用 VS Code Remote-SSH 插件连接远程 Linux 主机步骤

## 1. 安装 Remote-SSH 插件

1. 打开 **VS Code**。
2. 按下 `Ctrl + Shift + X` 打开扩展面板。
3. 在搜索框中输入 `Remote - SSH`。
4. 找到 **Remote - SSH** 插件（由 Microsoft 开发）并点击 **安装**。
5. 如果你还需要编辑远程容器，或者调试远程项目，也可以同时安装 `Remote - SSH: Editing Configuration Files` 和 `Remote - SSH: Explorer` 插件。

## 2. 配置 SSH 密钥，

参考前一章 点击 [这里](#section1) 查看。

> 4.使用密钥登录（推荐）

## 3. 使用 Remote-SSH 插件连接到远程主机

1. 按下 `Ctrl + Shift + P` 打开命令面板。
2. 输入并选择 `Remote-SSH: Connect to Host`。
3. 第一次连接时，选择 **Add New SSH Host**，并输入以下格式的 SSH 命令：
    ```bash
    ssh root@10.166.8.65
    ```
4. 提示输入 SSH 密码，或者如果已经配置密钥登录，则会直接登录。

5. **保存 SSH 主机信息**：系统会提示你选择保存 SSH 主机的配置文件路径，通常为 `~/.ssh/config` 文件。可以为不同的主机配置不同的别名和连接选项。

## 4. 配置 SSH Config 文件（可选）

你可以通过编辑 `~/.ssh/config` 文件来管理多个远程主机的连接信息。打开 VS Code 或文本编辑器，编辑 `~/.ssh/config` 文件，添加以下内容：

```bash
Host my-linux-server
    HostName 10.166.8.65           # 远程服务器的IP地址或域名
    User root                       # 远程服务器的登录用户名
    IdentityFile "C:/Users/sailchou/.ssh/keys/id_rsa"         # 私钥文件路径
    Port 22                            # SSH端口，默认是22
```

## 5. 重新连接远程主机

1. 打开命令面板（`Ctrl + Shift + P`），再次选择 `Remote-SSH: Connect to Host`。
2. 你会看到之前配置的主机名称，例如 `my-linux-server`。点击该主机即可连接。

## 6. 使用远程工作空间

成功连接远程主机后，VS Code 将会打开一个新的窗口，并且所有的操作都在远程主机上进行。你可以：

-   **直接编辑远程文件**：通过资源管理器浏览远程主机的文件，并在 VS Code 中直接编辑它们。
-   **在远程主机上运行命令**：通过 VS Code 的终端，运行在远程主机上的命令。

## 7. 使用 Remote-SSH 命令

按下 `Ctrl + Shift + P` 打开命令面板，输入以下常用命令：

-   `Remote-SSH: Connect to Host`: 连接到指定的远程主机。
-   `Remote-SSH: Open SSH Configuration File`: 打开并编辑 SSH 配置文件。
-   `Remote-SSH: Kill VS Code Server on Host`: 关闭远程主机上运行的 VS Code 服务器。

## 8. 断开连接

1. 要断开与远程主机的连接，可以关闭 VS Code 窗口。
2. 或者打开命令面板，选择 `Remote-SSH: Close Remote Connection` 来断开连接。

通过以上步骤，你可以使用 VS Code 的 Remote-SSH 插件轻松连接并管理远程 Linux 主机上的项目。
