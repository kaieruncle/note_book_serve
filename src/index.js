import Koa from 'koa';
import bodyParser from 'koa-bodyparser';  
import cors from '@koa/cors';
import path from 'path';
const KoaSession = require('koa-session');
import { koaSwagger } from 'koa2-swagger-ui';
import staticResource from 'koa-static';
import swagger from '@/lib/swagger.config';
import config from '@/core/config';
import { catchError } from '@/middlewares/exception';
import sessionConfig from './lib/session.config';
import r from '@/routes/index';
const app = new Koa();
const { ip, port,keys } = config;
app.keys = keys;
const session = KoaSession(sessionConfig, app)
/**
 * 全局中间件
 */
// body-parser
app.use(bodyParser());
// 跨域
app.use(cors());
// session
app.use(session);
// 托管静态文件
app.use(staticResource(path.join(__dirname,'../','assets')))

// 统一异常处理
app.use(catchError);
// swagger
app.use(swagger.routes(), swagger.allowedMethods());
if (process.env.NODE_ENV === 'development'){
  app.use(koaSwagger({
    routePrefix: '/swagger', // 接口文档访问地址
    swaggerOptions: {
      url: '/doc-json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
    },
    exposeSpec: true,
    hideTopbar: true
  }))
}
// 注册路由
r(app)

/**
 * 启动服务
 */
app.listen(port, () => {
  console.log(`服务地址:${ip}:${port}`)
});