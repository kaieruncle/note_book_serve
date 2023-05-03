import axios from "axios";
import UserModal from '@/models/User';
import LoversModal from '@/models/Lovers';
// import FlakeId from 'flake-idgen';
// import intformat from 'biguint-format';
// const flakeIdGen = new FlakeId();
import config from '@/core/config';
const { appid, secret } = config;

export default {
    /**
     * 获取openid
     */
    getUserOpenId: async (jsCode) => {
        const { data } = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${jsCode}&grant_type=authorization_code`)
        const { openid } = data || {}
        return openid
    },
    /**
     * 更新用户信息
     */
    updateUserInfo: async (openid, nick, avatar) => {
        const isSuccess = await UserModal.updateUserInfo(openid, nick, avatar)
        return isSuccess
    },

    /**
     * 查询/新增用户
     */
    getOrAddUser: async (openid) => {
        const user = await UserModal.findOrCreateUser(openid)
        return user
    },

    /**
     * 查询用户
     */
    getUserInfo: async (openid) => {
        const user = await UserModal.getUserInfo(openid)
        return user
    },
    /**
     * 更新用户邮箱
     */
    updateUserEmail: async(openid,email)=>{
        const isSuccess = await UserModal.updateUserEmail(openid, email)
        return isSuccess
    }
}