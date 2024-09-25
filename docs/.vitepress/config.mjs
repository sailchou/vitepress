import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SAILCHOU的博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '技术总结', link: '/VSCode设置/sftp-linux' }
    ],

    sidebar: [
      {
        text: 'VSCode 设置',
        items: [
          { text: 'SFTP连接Linux主机', link: '/VSCode设置/sftp-linux' },
          { text: 'Remote-SSH连接Linux主机', link: '/VSCode设置/remote-ssh-linux' },
          { text: 'Remote-SSH遇到的坑点', link: '/VSCode设置/help-ssh-linux' },
        ]
      },
      {
        text: 'Nodejs 技术',
        items: [
          { text: 'npm 命令详解', link: '/Nodejs技术/npm-cmd' },
          { text: 'pm2 部署应用', link: '/Nodejs技术/pm2' },
          { text: 'loadtest 压力测试', link: '/Nodejs技术/load-test' },
          { text: 'node环境变量', link: '/Nodejs技术/env' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sailchou' }
    ],

    footer: {
      message: 'Powered by <a href="https://vitepress.dev/">VitePress</a>',
      copyright: 'Copyright © 2024-present <a href="https://github.com/sailchou">sailchou</a>'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local'
    }

  }
})
