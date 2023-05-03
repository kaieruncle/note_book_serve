import r from '@/lib/swagger.config'
import userRouter from '@/routes/user'
import systemRouter from '@/routes/system'
import loversRouter from '@/routes/lovers'
export default app => {
    userRouter(r)
    systemRouter(r)
    loversRouter(r)
    app.use(r.routes()).use(r.allowedMethods());
}