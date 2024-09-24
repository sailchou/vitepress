# 使用 VS Code Remote-SSH 插件连接远程 Linux 主机坑点

## 提示端口转发失败无法连接

解决办法：修改远程主机的 ssh 文件配置，修改完后重启 sshd，修改的配置项为 `AllowTcpForwarding yes`，如果该项被注释掉了，取消注释即可。还有比如无法用密钥登录的问题，也是通过修改这 ssh 配置文件中的配置可以解决。

```bash
vi /etc/ssh/ssh_config
vi /etc/ssh/sshd_config
sudo systemctl restart sshd
```

## 网络问题无法正常安装项目依赖

没有科学上网环境，无法正常安装很多软件依赖时，可以将本地主机当作代理设置给远程主机使用， 使用`export`命令可以临时设置环境变量，这些变量在当前会话中有效，关闭终端后将不再生效。以下是如何使用`export`命令临时设置代理的步骤。

### 1. 设置 HTTP 和 HTTPS 代理

你可以使用以下命令临时设置 HTTP 和 HTTPS 代理：

```bash
export http_proxy="http://proxy_server:proxy_port"
export https_proxy="http://proxy_server:proxy_port"
```

替换`proxy_server`和`proxy_port`为你的代理服务器地址和端口。

### 2. 设置 FTP 代理

如果你还需要设置 FTP 代理，可以使用以下命令：

```bash
export ftp_proxy="http://proxy_server:proxy_port"
```

### 3. 设置不使用代理的主机

你可以设置不通过代理的主机列表：

```bash
export no_proxy="localhost,127.0.0.1,::1"
```

### 4. 验证代理设置

你可以使用以下命令验证代理设置是否生效：

```bash
echo $http_proxy
echo $https_proxy
echo $ftp_proxy
echo $no_proxy
```

### 5. 示例

假设你的代理服务器地址是`192.168.1.1`，端口是`8080`，你可以使用以下命令设置代理：

```sh
export http_proxy="http://192.168.1.1:8080"
export https_proxy="http://192.168.1.1:8080"
export ftp_proxy="http://192.168.1.1:8080"
export no_proxy="localhost,127.0.0.1,::1"
```

### 6. 取消代理设置

如果你想取消代理设置，可以使用以下命令：

```sh
unset http_proxy
unset https_proxy
unset ftp_proxy
unset no_proxy
```

### 7. 使用代理的示例命令

设置代理后，你可以使用以下命令测试代理是否生效：

```sh
curl -I http://example.com
```

或者使用`wget`：

```sh
wget http://example.com
```

通过以上步骤，你可以临时设置代理，并在当前会话中使用它们。关闭终端后，这些设置将不再生效。**也可以写入系统环境变量中，使代理设置长期有效。**

### 8. 设置系统范围的代理

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

## 使用 fnm 安装 nodejs 环境，需要科学上网

### 1. installs fnm (Fast Node Manager)

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

### 2. activate fnm

```bash
source ~/.bashrc
```

### 3. download and install Node.js

```bash
fnm use --install-if-missing 20
```

### 4. verifies the right Node.js version is in the environment

```bash
node -v
```

should print `v20.17.0`

### 5. verifies the right npm version is in the environment

```bash
npm -v
```

should print `10.8.2`
