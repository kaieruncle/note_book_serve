import { Op } from "sequelize";
import { Lovers } from "@/models/index";

// 创建modal
class LoversModal {
    /**
     * 增加一条关系绑定记录
     * @param openid 用户的openid
     */
    static async createLovers(initiate_openid, accept_openid) {
        const user = await Lovers.create({
            initiate_openid,
            accept_openid
        })
        return user
    }
    /**
     * 根据openid查询绑定关系
     */
    static async getLovers(openid) {
        const user = await Lovers.findOne({
            where: {
                [Op.or]: [{
                    initiate_openid: openid
                }, {
                    accept_openid: openid
                }]
            }
        })
        return user
    }
    /**
     * 删除情侣绑定记录
     */
    static async unBindLovers(openid) {
        const changeCount = await Lovers.destroy({
            where: {
                [Op.or]: [{
                    initiate_openid: openid
                }, {
                    accept_openid: openid
                }]
            }
        })
        return changeCount > 0
    }

}

export default LoversModal;
