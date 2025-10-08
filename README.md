# Eazy FIRE Calculator

Eazy FIRE Calculator 是一个使用 Next.js 14 构建的现代化网页应用，帮助用户根据储蓄、投资回报和生活开支假设评估实现财务自由 (FIRE) 所需的时间。应用通过动画化的界面展示名义资产增长与通胀调整后的真实购买力对比，并提供欧洲主要国家退休金和热门 FIRE 城市公务员收入的参考数据。

## 功能亮点

- 💡 交互式输入面板：设置目标资产、现有存款、定投金额、年终奖和预期投资回报率。
- 📈 资产增长模拟：同时展示名义价值与考虑 3% 通胀后的真实价值曲线。
- 🔁 实时预算反馈：突出显示实现 FIRE 所需时间与年度 / 月度支出。
- 🌍 参考数据面板：提供欧洲退休金和热门 FIRE 城市公务员收入的年化数据，帮助制定生活预算。

## 本地开发

1. **安装依赖**（首次使用或依赖更新后执行）：

   ```bash
   npm install
   ```

2. **启动开发服务器**：

   ```bash
   npm run dev
   ```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000) 预览应用。Next.js 会在保存文件后自动热重载页面。

4. **代码质量检查**：

   ```bash
   npm run lint
   ```

## 低成本部署方案

- **Vercel**（推荐）：Next.js 官方托管平台，提供免费套餐，支持一键 Git 集成与自动构建部署。
  1. 将仓库推送到 GitHub。
  2. 在 [Vercel](https://vercel.com/) 创建账号并导入仓库。
  3. 按默认设置部署即可；Vercel 会自动识别 Next.js 并完成构建。

- **Netlify**：免费套餐支持静态与 Serverless 功能。构建命令设为 `npm run build`，发布目录设为 `.next`，并开启 Next.js Runtime 插件。

- **自托管 / 低成本云主机**：
  1. 在服务器上执行 `npm install` 和 `npm run build`。
  2. 使用 `npm run start` 启动生产服务器。
  3. 建议配合 PM2、Docker 或 systemd 进行进程守护，并通过 Nginx/Traefik 反向代理提供 HTTPS 访问。

无论选择哪种部署方式，都可以通过配置环境变量或调整 `config/referenceData.ts` 中的数据来个性化假设参数。

## 目录结构

```
.
├── app/                # Next.js 路由与页面组件
├── components/         # 复用型 UI 组件
├── config/             # 外部配置与参考数据
├── lib/                # 财务计算相关的工具函数
├── public/             # 静态资源（如有）
├── package.json        # 项目依赖与脚本
└── tsconfig.json       # TypeScript 配置
```

欢迎提交 Issue 与 PR 来扩展功能或改进体验。
