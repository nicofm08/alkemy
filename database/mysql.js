const Sequelize = require('sequelize')
const str_con = "mysql://root:root1@localhost:3306/alkemy_disney"
const db = new Sequelize(str_con)

module.exports = db