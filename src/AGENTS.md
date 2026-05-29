# AGENTS 项目备忘

## 协作者信息

- 用户叫红豆。
- 用户特点：很懒，但是对新技术充满好奇。
- 协作时可以优先提供省事、可直接执行、自动化程度高的方案，同时保留对新技术和实现细节的解释空间。

## 项目定位

- 这是一个名为 `codex-shop` 的单页餐厅展示与预约网站。
- 页面品牌是“青禾小馆”，整体内容围绕餐厅主视觉、季节菜单、餐厅理念、营业信息和座位预约展开。
- 网站语言为中文，`index.html` 使用 `zh-CN`。
- 视觉风格偏温暖、精致、餐厅官网感：主色包含纸色背景、鼠尾草绿、番茄红、金色点缀和深绿故事区。

## 技术栈

- 构建工具：Vite。
- 前端框架：Vue 3，使用单文件组件和 `<script setup>`。
- 模块类型：ESM，`package.json` 中设置了 `"type": "module"`。
- 样式：全局 CSS 文件 `src/styles.css`，未使用 CSS 预处理器。
- 当前没有测试框架、路由、状态管理库或后端服务代码。

## 常用命令

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 生产构建：`npm run build`
- 预览构建产物：`npm run preview`

## 构建与部署

- Vite 配置文件是 `vite.config.js`。
- 当前 `base` 配置为 `/codex--/`，说明部署路径不是站点根目录；修改部署平台或路径时要同步检查这个配置。
- 构建输出目录是 `dist/`，已被 `.gitignore` 忽略。

## 目录结构

- `index.html`：页面入口，挂载点为 `#app`。
- `src/main.js`：创建 Vue 应用，加载 `App.vue` 和全局样式。
- `src/App.vue`：组合页面的主要区块组件。
- `src/components/`：页面组件目录。
- `src/services/reservations.js`：预约提交服务。
- `src/assets/`：餐厅主视觉和菜品图片。
- `src/styles.css`：全站布局、响应式和视觉样式。

## 页面组件

- `SiteHeader.vue`：固定顶部导航，包含品牌、页面锚点导航和电话入口。
- `HeroSection.vue`：首屏主视觉，使用 `restaurant-hero.png` 作为背景，包含预约和浏览菜单按钮，以及今日推荐。
- `MenuSection.vue`：本周精选菜单，数据写在组件内，展示三道菜品卡片。
- `StorySection.vue`：餐厅理念与营业信息，包含营业时间和地址信息。
- `BookingSection.vue`：预约表单，包含姓名、电话、人数、日期、时间和备注。
- `SiteFooter.vue`：页脚，展示品牌、电话和供应提示。

## 预约功能

- 预约提交入口是 `submitReservation`，位于 `src/services/reservations.js`。
- 如果环境变量 `VITE_RESERVATION_ENDPOINT` 存在，会向该地址发送 `POST` 请求，内容类型为 `application/json`。
- 如果没有配置接口，会模拟约 650ms 的异步提交，并把最近 20 条预约保存到浏览器 `localStorage`。
- 本地存储 key 是 `qinghe-reservations`。
- 本地保存时会补充 `id` 和 `createdAt`。
- 表单会校验姓名、手机号、日期和时间。
- 手机号校验面向中国大陆手机号，规则为 `^1[3-9]\d{9}$`。
- 日期不能早于当天，`minDate` 由当前日期计算。
- 提交成功后会重置表单，并短暂显示成功状态。

## 样式与响应式

- 样式集中在 `src/styles.css`。
- 使用 CSS 变量管理颜色：`--ink`、`--muted`、`--paper`、`--sage`、`--tomato`、`--gold` 等。
- Header 在桌面端固定在顶部，移动端改为绝对定位。
- 菜品区桌面端为三列网格，窄屏变为单列。
- Story 和 Booking 区桌面端为双列布局，窄屏变为单列。
- 表单在桌面端为双列，手机端为单列。

## 资源文件

- `restaurant-hero.png`：首屏背景图。
- `dish-steak.png`：牛排菜品图。
- `dish-pasta.png`：意面菜品图。
- `dish-seafood.png`：海鲜菜品图。

## 维护注意事项

- 项目内中文文件本身是 UTF-8，但在某些 PowerShell 输出里可能会显示成乱码；编辑时应保持 UTF-8 编码。
- 修改页面文案时要同时关注可访问性字段，例如 `aria-label`、图片 `alt`、表单错误提示等。
- 如果接入真实预约后端，优先通过 `VITE_RESERVATION_ENDPOINT` 配置，不需要改组件表单逻辑。
- 如果新增页面级区块，先在 `src/components/` 中创建组件，再在 `App.vue` 中按页面顺序引入。
- 如果新增图片资源，放入 `src/assets/` 并通过组件 import 使用，保持 Vite 的资源处理方式一致。
- 当前没有自动化测试；改动预约逻辑后建议至少运行 `npm run build` 并手动验证表单提交、校验和成功状态。
