POP App
========

## 前端本地模拟Server安装启动方法

用express模拟服务端返回数据，便于本机调试接口

访问端口 18001 (可在app中修改)

```sh
npm i pm2 body-parser cookie-parser express nornj path lodash --save
```

启动方法

```sh
npm run server
```

关闭服务方法

```sh
pm2 kill
```
