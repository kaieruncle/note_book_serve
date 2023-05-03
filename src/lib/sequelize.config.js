import Sequelize from 'sequelize'
import config from '@/core/config'
// 导入log
import { sqlLogger } from '@/lib/logger.config'
const { sqlConf } = config || {}
const { database, username, password } = sqlConf || {}
export default new Sequelize(database, username, password, {
    ...sqlConf,
    logging: (...msg) => {
        sqlLogger.info(msg)
    },
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
})