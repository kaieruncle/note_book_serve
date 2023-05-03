import Sequelize from 'sequelize'
import sequelize from "@/lib/sequelize.config";
/**
 * user表
 * 用户表
 */
export const User = sequelize.define(
  'user',
  {
    // 用户openid
    openid: {
      type: Sequelize.STRING(255),
      field: 'openid',
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    // 用户昵称
    nick: {
      type: Sequelize.STRING(255),
      field: 'nick',
      allowNull: false,
      defaultValue: '注册用户'
    },
    // 用户头像
    avatar: {
      type: Sequelize.STRING(255),
      field: 'avatar',
      allowNull: false,
      defaultValue: 'default_avatar.png'
    },
    // 用户邮箱
    email: {
      type: Sequelize.STRING(255), 
      field: 'email',
      validate: {
        isEmail: true
      }
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  }
);
/**
 * lovers表
 * 用户表
 */
export const Lovers = sequelize.define(
  'lovers',
  {
    // 主键
    id: {
      type: Sequelize.UUID,
      field: 'id',
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  }
);
Lovers.belongsTo(User, {
  foreignKey: {
    name: 'initiate_openid',
    as: 'initiate_openid'
  },
  targetKey: 'openid'
});
Lovers.belongsTo(User, {
  foreignKey: {
    name: 'accept_openid',
    as: 'accept_openid'
  },
  targetKey: 'openid'
});
/**
 * 笔记表
 */
export const Notes = sequelize.define(
  'notes',
  {
    // 主键
    id: {
      type: Sequelize.UUID,
      field: 'id',
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    // 内容
    content: {
      type: Sequelize.TEXT,
      field: 'content',
      allowNull: false
    },
    // 图片地址
    file_path: {
      type: Sequelize.TEXT,
      field: 'file_path',
      allowNull: false
    }

  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  }
);
Notes.belongsTo(User, {
  foreignKey: {
    name: 'openid',
    as: 'openid'
  },
  targetKey: 'openid'
});
sequelize.sync({ alert: true });
