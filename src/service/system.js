import axios from "axios";
import conf from "@/core/config"
const { appid, secret } = conf
import UserModal from "@/models/User";
export default {
    /**
     * 创建
     */
    createActivityId: async (openid) => {
        // 获取access_token
        const { data: accessTokenData } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
        const { access_token } = accessTokenData || {}
        // 获取activity_id
        const { data: activityData } = await axios.get(`https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create?access_token=${access_token}&openid=${openid}`,)
        const { activity_id } = activityData || {}
        return activity_id
    }
}