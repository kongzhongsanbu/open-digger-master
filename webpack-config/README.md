# 使用说明
## 一、目录结构

> 仅供参考

```
|--dist 最终生成的html文件的存放路径
|--webpack-config  配置文件，不用管
|--src
    |--client  客户端代码（React代码）
    |--server  服务端代码（node代码）
    |--data  node生成的静态数据
|--.babelrc  配置文件，不用管
|--package.json  需要更新
|--tsconfig.json  需要更新
```

## 二、准备工作

安装依赖

```
npm i
```

## 三、开发环境

页面入口在`src/client/index.tsx`

```javascript
// 开发环境调试
npm run dev
```

## 四、生产环境

编译结果在`dist/index.html`，只取这一个文件即可，其他的可以忽略

```javascript
// 生产环境编译
npm run prod
```
