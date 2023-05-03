import UserService from "@/service/user";
import LoversService from '@/service/lovers'
import { ParameterException, AuthorizeException, SignNotSupportException } from "@/core/http-exception";
export default {

  /**
   * 微信小程序登录
   */
  login: async (ctx, next) => {
    const { jsCode } = ctx.request.body;
    if (!jsCode) throw new ParameterException('非法code')
    // 获取openid
    const openid = await UserService.getUserOpenId(jsCode)
    // 获取/新增用户
    const user = await UserService.getOrAddUser(openid)
    ctx.session.user = user
    ctx.body = {
      code: 200,
      data: true
    }
  },

  /**
   * 获取用户信息
   */
  getUserInfo: async (ctx, next) => {
    if (!ctx.session.user) throw new AuthorizeException()
    const { openid } = ctx.session.user || {}
    const { nick, avatar,email } = await UserService.getUserInfo(openid)
    const lovers = await LoversService.getLovers(openid)
    ctx.body = {
      code: 200,
      data: {
        nick,
        avatar,
        openid,
        email,
        binded: !!lovers
      }
    }
  },
  /**
   * 根据openid获取用户信息
   */
  getUserInfoByOpenid: async (ctx, next) => {
    const { initiate_openid } = ctx.request.query;
    const { nick, avatar } = await UserService.getUserInfo(initiate_openid)
    ctx.body = {
      code: 200,
      data: {
        nick,
        avatar
      }
    }
  },
  /**
   * 更新用户昵称
   */
  updateUserInfo: async (ctx, next) => {
    if (!ctx.session.user) throw new AuthorizeException()
    const { openid } = ctx.session.user || {}
    const { nick, avatar } = ctx.request.body;
    if (!nick) throw new ParameterException('请填写用户昵称')
    if (!avatar) throw new ParameterException('请上传头像')
    const isSuccess = await UserService.updateUserInfo(openid, nick, avatar)
    ctx.body = {
      code: 200,
      data: isSuccess
    }
  },
  /**
   * 更新用户邮箱
   */
  updateUserEmail: async (ctx, next) => {
    if (!ctx.session.user) throw new AuthorizeException()
    const { openid } = ctx.session.user || {}
    const { email } = ctx.request.body;
    if (!email) throw new ParameterException('请填写邮箱')
    const reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    if (!reg.test(email)) throw new ParameterException('请填写正确格式邮箱')
    const isSuccess = await UserService.updateUserEmail(openid, email)
    ctx.body = {
      code: 200,
      data: isSuccess
    }
  },
};
