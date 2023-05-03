// 导入异常基类
import { HttpException } from '../core/http-exception'
// 导入log
import { apiErrLogger, defaultLogger } from '@/lib/logger.config'
/**
 * 异常拦截器
 */
export const catchError = async (ctx, next) => {
  // 尝试拦截错误
  try {
    await next()
  } catch (error) {
    // 是否继承自基类
    if (error instanceof HttpException) {
      const { msg, errorCode } = error || {}
      ctx.body = {
        msg,
        errorCode
      }
      apiErrLogger.error(error)
    } else {
      // 未知的异常
      ctx.status = 500
      ctx.body = {
        msg: '系统未知错误',
        errorCode: '-1'
      }
      apiErrLogger.error({
        msg: '系统未知错误',
        errorCode: '-1',
        error
      })
    }
  }
}