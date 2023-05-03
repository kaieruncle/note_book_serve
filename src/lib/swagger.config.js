import config from '@/core/config'
import router from 'koa-router'
import path from "path"
import swaggerJSDoc from 'swagger-jsdoc'
const r = router()
const { ip, port } = config
const swaggerDefinition = {
    info: {
        title: 'blog项目访问地址',
        version: '1.0.0',
        description: 'API',
    },
    host: `http://${ip}:${port}`,
    basePath: '/'
};
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../", "routes/*.js")],
};
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
r.get('/doc-json', async ctx => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})
export default r