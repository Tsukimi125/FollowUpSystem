# FollowUpSystem

## 项目背景

## 项目介绍

## 构建方法

### FrontEnd
#### 随访系统前端

#### 📙 项目目录结构说明


#### 📗 项目创建方式:

```bash
$ yarn create @umijs/umi-app
# 或 npx @umijs/create-umi-app
```

**参考 umi 文档:**

https://umijs.org/zh-CN/docs

#### 📋 常用控制台指令：

**安装依赖:**

```bash
$ yarn
```

**开启 dev 服务器:**

```bash
$ yarn start
$ yarn start:dev
$ yarn start:prod
```

**分析构建文件体积:**

```bash
$ yarn analyze
```

**构建项目:**

```bash
$ yarn build
$ yarn build:dev
$ yarn build:prod
```

**查看 dva 列表**

```bash
$ yarn dvalist
```

**生成 openapi**

```bash
$ yarn openapi
```

项目具体指令看 package.json 文件

yarn 的指令请参考 : yarn 中文文档: https://yarn.bootcss.com/docs/usage/

#### 🎈vscode 插件

#### 需要使用的 vscode 插件有:

- **ESLint (代码规范)**
- **koroFileHeader (注释)**
- **Prettier - Code formatter (注释规范)**

#### 可选插件

- **Chinese (Simplified) Language Pack for Visual Studio Code (中文插件)**
- **GitLens — Git supercharged (git)**
- **One Dark Pro (主题)**
- **vscode-icons (图标)**

#### 📃vscode 配置文件参考:

```json
{
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "vscode-icons",
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "fileheader.customMade": {
    // 头部注释
    "Author": "linkenzone", // 文件编辑者
    "Date": "Do not edit", // 文件创建时间
    "Descripttion": "Do not edit" // 文件描述
  },
  "fileheader.cursorMode": {
    // 函数注释
    "description": "",
    "param": "",
    "return": ""
  }
}
```

#### 🔵 页面代码结构推荐

参考: https://beta-pro.ant.design/docs/folder-cn

为了让项目代码组织更加规范，让开发能够更方便的定位到相关页面组件代码，我们定义了一套规范，该规范当前只作为推荐的指导，并非强制。

```
src
├── components
└── pages
    ├── Welcome        // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── Form.tsx
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── Order          // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── index.tsx
    |   └── index.less
    ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
    |   ├── components // group 下公用的组件集合
    |   ├── Login      // group 下的页面 Login
    |   ├── Register   // group 下的页面 Register
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *              // 其它页面组件代码
```

所有路由组件（会配置在路由配置中的组件）我们推荐以大驼峰命名打平到 pages 下面第一级（复杂的项目可以增加 group 层级，在 group 下放置 pages）。不建议在路由组件内部再嵌套路由组件 - 不方便分辨一个组件是否是路由组件，而且不方便快速从全局定位到路由组件。

我们推荐尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件我们推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，我们推荐就近维护到路由组件文件夹下即可。


### BackEnd
#### 运行guide
> 在执行以下指令前，确保你已经安装了jdk 11和最新版本的maven
* 拉取代码，进入当前目录，执行`mvn package`
* 进入target目录`cd target`
* 执行jar文件启动服务`java -jar ./tongji_follow_up-0.0.1-SNAPSHOT.jar`
> 注意，启动服务时可能会报error，这是由于你没有配置mysql，请在`resource/config/application-dev.yaml`中配置数据库的地址、用户名、密码，并在你部署的数据库中执行`depoly`文件夹下的所有sql脚本后，再次尝试启动服务
#### 接口文档
* 有关接口文档的信息详见：[接口文档](http://27.17.30.150:20104/project/664/interface/api)
