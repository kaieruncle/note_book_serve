import SystemService from "@/service/system"
import { AuthorizeException, ParameterException, ExpireException, UltraViresException } from "@/core/http-exception"
import UserService from "@/service/user"
import NoteService from "@/service/notes"
import LoversService from "@/service/lovers"

import fs from "fs";
import path from "path";
/**
 * 写入文件
 */
const asyncWriteFile = (savePath, buffer) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(savePath, buffer, () => {
            resolve();
        });
    });
};
export default {
    /**
     * 上传文件
     */
    uploadFile: async (ctx, next) => {
        // 获取上传文件
        const { file } = ctx.request.files;
        const { buffer, originalname } = file[0] || {};
        const savePath = path.join("assets", originalname);
        await asyncWriteFile(savePath, buffer);
        ctx.body = {
            code: 200,
            data: originalname
        }
    },
    /**
     * 创建activity_id
     */
    createActivityId: async (ctx, next) => {
        if (!ctx.session.user) throw new AuthorizeException()
        const { openid } = ctx.session.user || {}
        const activity_id = await SystemService.createActivityId(openid)
        ctx.body = {
            code: 200,
            data: activity_id
        }
    },
    /**
     * 新增一篇笔记
     */
    submitNote: async (ctx, next) => {
        if (!ctx.session.user) throw new AuthorizeException()
        const { openid } = ctx.session.user || {}
        const { content, needNotify, fileList } = ctx.request.body
        if (!content) throw new ParameterException('请输入内容！')
        // 获取另一半openid
        const { initiate_openid, accept_openid } = await LoversService.getLovers(openid)
        const touserId = openid === initiate_openid ? accept_openid : initiate_openid
        // 检查另一半是否绑定了邮箱
        const { email } = await UserService.getUserInfo(touserId)
        if (needNotify) {
            if (!email) throw new ParameterException('对方还未绑定邮箱')
        }
        // 插入数据
        const { id } = await NoteService.submitNote(openid, content, fileList)
        if (needNotify) {
            // 发送提醒
            await NoteService.sendEmailMessage(email, content, fileList, id)
        }
        ctx.body = {
            code: 200,
            data: id
        }
    },
    /**
     * 分页对应日期笔记
     */
    getNotesByDate: async (ctx, next) => {
        if (!ctx.session.user) throw new AuthorizeException()
        const { openid } = ctx.session.user || {}
        const { date } = ctx.request.query
        if (!date) throw new ParameterException('缺少对应日期！')
        const data = await NoteService.getNotesByDate(openid, date)
        ctx.body = {
            code: 200,
            data: data
        }
    },
    /**
     * 编辑笔记
     */
    editNote: async (ctx, next) => {
        if (!ctx.session.user) throw new AuthorizeException()
        const { openid } = ctx.session.user || {}
        const { content, id } = ctx.request.body
        if (!content) throw new ParameterException('请输入内容！')
        if (!id) throw new ParameterException('缺少必要参数！')
        // 越权检测
        const { openid: auth_openid } = await NoteService.getNoteDetail(id)
        if (auth_openid !== openid) throw new UltraViresException()
        // 编辑
        const isSuccess = await NoteService.editNote(id, content)
        ctx.body = {
            code: 200,
            data: isSuccess
        }
    },
    /**
     * 获取笔记详情
     */
    getNoteDetail: async (ctx, next) => {
        const { id } = ctx.request.query
        if (!id) throw new ParameterException('缺少必要参数！')
        // 获取笔记详情
        const { openid, content, created_at ,file_path} = await NoteService.getNoteDetail(id)
        // 获取作者信息
        const { nick, avatar } = await UserService.getUserInfo(openid)
        ctx.body = {
            code: 200,
            data: {
                content,
                created_at,
                nick,
                file_path,
                avatar
            }
        }
    },
    /**
     * 获取可下载文件
     */
    getFile: async (ctx, next) => {
        const { filePath } = ctx.request.query
        if (!filePath) throw new ParameterException('找不到该文件！')
        const file = fs.readFileSync(path.join('assets', filePath))
        ctx.set("Access-Control-Expose-Headers", "content-disposition");
        ctx.set(
            "Content-disposition",
            "attachment;filename=" + encodeURIComponent(filePath)
        );
        ctx.body = file
    }
}