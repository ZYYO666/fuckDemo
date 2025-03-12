![屏幕截图 2025-02-02 002015.png][1]

# 贪吃蛇游戏
先睡觉，演示站还没搭建
开源地址:https://github.com/ZYYO666/my-vue3-snake-demo
这是一个基于 Vue.js 的简单贪吃蛇游戏。玩家可以通过方向键控制蛇的移动，吃掉食物来增加分数。游戏提供了多种配置选项，包括网格大小、游戏难度、是否开启边框以及是否允许穿墙等功能。

## 功能特性

- **网格大小调整**：可以通过滑块调整游戏网格的大小，范围从 15x15 到 100x100。
- **游戏难度调整**：可以通过滑块调整游戏难度，难度越高，蛇的移动速度越快。
- **边框控制**：可以选择是否开启网格边框。
- **穿墙模式**：可以选择是否允许蛇穿墙，开启后蛇可以从一侧穿到另一侧。
- **开始、暂停、重新开始**：提供开始、暂停和重新开始按钮，方便控制游戏。

## 如何运行

1. **克隆仓库**：
   ```bash
   git clone https://github.com/ZYYO666/fuckDemo.git
   cd Vue3-Snake
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **运行项目**：
   ```bash
   npm run dev
   ```

4. **打开浏览器**：
   访问 `http://localhost:5173` 即可开始游戏。

## 项目结构

```
snake-game/
├── public/                # 静态资源
├── src/                   # 项目源代码
│   ├── assets/            # 静态资源
│   ├── components/        # Vue 组件
│   ├── App.vue            # 主组件
│   └── main.js            # 项目入口文件
├── index.html             # HTML 入口文件
├── package.json           # 项目依赖
└── README.md              # 项目说明文件
```

## 依赖

- Vue.js
- Element Plus (UI 组件库)

## 贡献

欢迎提交 Issue 和 PR，帮助改进这个项目。

## 许可证

本项目基于 MIT 许可证开源。


  [1]: https://zyyo.net/usr/uploads/2025/02/3970309708.png