import { User } from "@/models/index";

// 创建modal
class UserModal {
  /**
   * 增加/查询一条用户记录
   * @param openid 用户的openid
   */
  static async findOrCreateUser(openid) {
    const [user, created] = await User.findOrCreate({
      where: { openid },
      defaults: {
        openid
      }
    })
    return user
  }
  /**
   * 获取用户信息
   */
  static async getUserInfo(openid) {
    const user = await User.findOne({
      where: { openid }
    })
    return user
  }
  /**
   * 更新用户基本信息
   */
  static async updateUserInfo(openid, nick, avatar) {
    const [changeCount] = await User.update({
      nick,
      avatar
    }, {
      where: { openid }
    })
    return changeCount > 0
  }
  /**
   * 更新用户邮箱
   */
  static async updateUserEmail(openid, email) {
    const [changeCount] = await User.update({
      email
    }, {
      where: { openid }
    })
    return changeCount > 0
  }
}

export default UserModal;
