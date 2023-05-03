/**
 * 异常处理基类
 */
export class HttpException extends Error {
  constructor(msg = "服务器异常") {
    super();
    this.msg = msg;
    this.errorCode = '-1'
  }
}
/**
 * 未授权
 */
export class AuthorizeException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "授权失效";
    this.errorCode = '000001'
  }
}
/**
 * 客户端参数错误异常类
 */
export class ParameterException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "参数错误";
    this.errorCode = '000002'
  }
}
/**
 * 该用户已绑定过情侣关系
 */
export class IsBindedException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "该用户已绑定过情侣关系！";
    this.errorCode = '000003'
  }
}
/**
 * 对方订阅已过期
 */
export class ExpireException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "订阅过期，提醒Ta重新订阅！";
    this.errorCode = '000004'
  }
}
/**
 * 越权错误
 */
export class UltraViresException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "您没有权限编辑此笔记！";
    this.errorCode = '000005'
  }
}
/**
 * 不可自己绑定自己
 */
export class BindSelfException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "不可绑定自己哦！";
    this.errorCode = '000006'
  }
}
/**
 * sql错误
 */
export class SqlException extends HttpException {
  constructor(msg) {
    super();
    this.msg = msg || "sql语法错误";
    this.errorCode = '100000'
  }
}
