import { Op } from "sequelize";
import { Notes } from "@/models/index";

// 创建modal
class NotesModal {
  /**
   * 新增一个笔记
   * @param openid 用户的openid
   * @param content 笔记内容
   */
  static async createNote(openid, content,file_path) {
    const note = await Notes.create({ openid, content,file_path })
    return note
  }
  /**
   * 通过日期获取笔记列表
   * @param openid 用户的openid
   * @param pageNo 分页页数
   * @param pageSize 分页数量
   */
  static async getNotesByDate(openid, date) {
    const { count, rows } = await Notes.findAndCountAll({
      where: {
        openid: {
          [Op.eq]: openid
        },
        created_at: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
        }
      }
    });
    return { count, rows }
  }
  /**
   * 查询笔记详情
   */
  static async getNoteDetail(id) {
    const note = await Notes.findByPk(id);
    return note
  }
  /**
   * 编辑笔记
   */
  static async editNote(id, content) {
    const [changeCount] = await Notes.update({
      content
    }, {
      where: { id }
    })
    return changeCount > 0
  }
}

export default NotesModal;
