import axios from "axios";
// import moment from "moment"
import nodemailer from "nodemailer";
// import fs from "fs";
import conf from "@/core/config"
const { appid, secret,nodemailerConf } = conf
const {user,pass} = nodemailerConf || {}
import NotesModal from "@/models/Notes";
// import path from "path";
export default {
    /**
     * 创建一篇笔记
     */
    submitNote: async (openid, content, fileList) => {
        let file_path = ''
        if (fileList && Array.isArray(fileList)) {
            const files = fileList.map(v=>v.url)
            file_path = files.join(',')
        }
        const note = await NotesModal.createNote(openid, content, file_path)
        return note
    },
    /**
     * 根据日期查询列表
     */
    getNotesByDate: async (openid, date) => {
        const note = await NotesModal.getNotesByDate(openid, date)
        return note
    },
    /**
     * 发送模板消息
     * @param touser 接收者的openid
     */
    // sendTmpMessage: async (touser, note_id, content) => {
    //     // 获取access_token
    //     const { data: accessTokenData } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
    //     const { access_token } = accessTokenData || {}
    //     // 获取activity_id
    //     const { data: sendResData } = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`, {
    //         template_id: '07fkht90c8tYybVeWMWZrNfvPn32BkZfN5CNNnJPfTA',
    //         page: `/pages/detail/detail?id=${note_id}`,
    //         touser,
    //         data: {
    //             "thing2": {
    //                 "value": "Ta不开心啦！"
    //             },
    //             "date3": {
    //                 "value": moment().format('YYYY年MM月DD日')
    //             },
    //             "thing1": {
    //                 "value": content.substring(0, 18)
    //             }
    //         }
    //     })
    //     const { errmsg } = sendResData || {}
    //     return errmsg === 'ok'
    // },
    /**
     * 发送邮件
     */
    sendEmailMessage: async (email, content, fileList, id) => {
        // 获取access_token
        const { data: accessTokenData } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
        const { access_token } = accessTokenData || {}
        // 生成小程序二维码 
        const { data: buffer } = await axios.post(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`, {
            path: `pages/detail/detail?id=${id}`
        }, { responseType: 'arraybuffer' })
        // const fileName = `${new Date().getTime()}.jpg`
        // const savePath = path.join('assets', fileName)
        // fs.writeFile(savePath, buffer, (err) => { });
        const base64Str = buffer.toString('base64');
        let transporter = nodemailer.createTransport({
            service: 'qq',
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user, // 发送方邮箱的账号
                pass, // 邮箱授权密码
            },
        });
        // 整理文件片段
        let fileFragment = ''
        if (fileList && Array.isArray(fileList)){
            fileList.forEach(v=>{
                const type = v.url.split('.')[1]
                if (type === 'mp4'){
                    fileFragment += `<p><video controls src="${v.fullUrl}"></video><p>`
                }else{
                    fileFragment += `<p><img src="${v.fullUrl}" /></p>`
                }
            })
        }

        await transporter.sendMail({
            from: "记仇小本本小程序", // 发送方邮箱的账号
            to: email, // 邮箱接受者的账号
            subject: 'Ta的记仇小本本有@你！注意查收！', // Subject line
            html: `
            <p>Ta的小本本上记了一笔仇，内容为：</p>
            <p>${content}</p>
            <p>${fileFragment}</p>
            <p>扫码进入小程序查看</p>
            <p>
                <img src="data:image/jpg;base64,${base64Str}"/>
            </p>`
        });
    },
    /**
     * 获取笔记详情
     */
    getNoteDetail: async (id) => {
        const note = await NotesModal.getNoteDetail(id)
        return note
    },
    /**
     * 编辑笔记
     */
    editNote: async (id, content) => {
        const isSuccess = await NotesModal.editNote(id, content)
        return isSuccess
    },
}