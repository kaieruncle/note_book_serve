import LoversService from '@/service/lovers'
import { ParameterException, AuthorizeException, IsBindedException, BindSelfException } from "@/core/http-exception";
export default {
    /**
     * 绑定情侣关系
     */
    bindLovers: async (ctx, next) => {
        // 检测是否登录
        if (!ctx.session.user) throw new AuthorizeException()
        // 检查当前用户是否可创建关系
        const { openid: accept_openid } = ctx.session.user || {}
        const acceptAllow = await LoversService.getLovers(accept_openid)
        if (!!acceptAllow) throw new IsBindedException('您已绑定过情侣关系')
        // 检查邀请人是否可创建关系
        const { initiate_openid } = ctx.request.body;
        const initAllow = await LoversService.getLovers(initiate_openid)
        if (!!initAllow) throw new IsBindedException('邀请人已绑定过情侣关系')
        // 检查是否自己绑定自己
        if (accept_openid === initiate_openid) throw new BindSelfException()
        // 创建关系
        await LoversService.createLovers(initiate_openid, accept_openid)
        ctx.body = {
            code: 200,
            data: true
        }
    },
    /**
     * 解除情侣关系
     */
    unBindLovers: async (ctx, next) => {
        // 检测是否登录
        if (!ctx.session.user) throw new AuthorizeException()
        // 检查当前用户是否有情侣关系
        const { openid } = ctx.session.user || {}
        const acceptAllow = await LoversService.getLovers(openid)
        if (!acceptAllow) throw new ParameterException('您还没有绑定过情侣关系！')
        // 创建关系
        const isSuccess = await LoversService.unBindLovers(openid)
        ctx.body = {
            code: 200,
            data: isSuccess
        }
    },
};
