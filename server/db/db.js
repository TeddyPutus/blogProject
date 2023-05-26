const Sequelize = require('sequelize')
const path = require('path')

const db = new Sequelize('database', 'username', 'password',{
    dialect: 'sqlite',
    storage: 'etc/db/BlogDB.sqlite',
    logging: false
})

module.exports = db