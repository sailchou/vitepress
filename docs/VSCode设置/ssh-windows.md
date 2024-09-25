# 使用 SSH 连接到 Windows 服务器

使用 SSH 连接到 Windows 服务器需要在 Windows 服务器上安装并配置 OpenSSH 服务器。以下是详细的步骤：

## 步骤一：在 Windows 服务器上安装 OpenSSH 服务器

1. **安装 OpenSSH 服务器**：

    - 打开“设置”应用程序。
    - 点击“应用”。
    - 点击“可选功能”。
    - 点击“添加功能”。
    - 在列表中找到并选择“OpenSSH 服务器”，然后点击“安装”。

2. **启动并配置 OpenSSH 服务器**：

    - 打开 PowerShell（以管理员身份运行）。
    - 启动 OpenSSH 服务器：

        ```powershell
        Start-Service sshd
        ```

    - 设置 OpenSSH 服务器为自动启动：

        ```powershell
        Set-Service -Name sshd -StartupType 'Automatic'
        ```

    - 配置防火墙以允许 SSH 流量：

        ```powershell
        New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
        ```

## 步骤二：配置 SSH 服务器

1. **编辑 SSH 配置文件**：

    - 打开 `C:\ProgramData\ssh\sshd_config` 文件（如果文件不存在，请创建一个）。
    - 确保以下配置项存在并正确配置：

        ```plaintext
        Port 22
        ListenAddress 0.0.0.0
        PubkeyAuthentication yes
        PasswordAuthentication yes
        ```

2. **重新启动 SSH 服务器**：

    ```powershell
    Restart-Service sshd
    ```

## 步骤三：从客户端连接到 Windows 服务器

1. **使用 SSH 客户端连接**：

    - 在 Linux 或 macOS 上，你可以使用内置的 SSH 客户端。
    - 在 Windows 上，你可以使用 PowerShell 或安装 OpenSSH 客户端。

2. **连接到 Windows 服务器**：

    ```sh
    ssh username@windows_server_ip
    ```

    例如：

    ```sh
    ssh user@192.168.1.100
    ```

3. **输入密码**：
   当提示输入密码时，输入 Windows 服务器上的用户密码。

## 注意事项

-   **用户权限**：确保你使用的用户具有登录权限。
-   **防火墙设置**：确保防火墙允许端口 22 的入站流量。
-   **安全性**：为了提高安全性，建议使用公钥认证而不是密码认证。

## 使用公钥认证

1. **生成 SSH 密钥对**：

    ```sh
    ssh-keygen -t rsa -b 2048 -f ~/.ssh/id_rsa
    ```

2. **将公钥复制到 Windows 服务器**：

    ```sh
    ssh-copy-id user@windows_server_ip
    ```

3. **配置 SSH 服务器以接受公钥认证**：

    - 确保 `sshd_config` 文件中有以下配置：

        ```plaintext
        PubkeyAuthentication yes
        ```

4. **重新启动 SSH 服务器**：

    ```powershell
    Restart-Service sshd
    ```

通过这些步骤，你可以成功地使用 SSH 连接到 Windows 服务器。
