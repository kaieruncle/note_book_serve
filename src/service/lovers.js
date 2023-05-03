import LoversModal from '@/models/Lovers';

export default {
    /**
     * 查询用户关系
     */
    getLovers: async (openid) => {
        const lovers = await LoversModal.getLovers(openid)
        return lovers
    },
    /**
     * 绑定情侣关系
     */
    createLovers: async (initiate_openid, accept_openid) => {
        const lovers = await LoversModal.createLovers(initiate_openid, accept_openid)
        return lovers
    },
    /**
     * 解绑情侣关系
     */
    unBindLovers: async (openid) => {
        const isSuccess = await LoversModal.unBindLovers(openid)
        return isSuccess
    },
}