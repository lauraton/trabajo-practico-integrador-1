import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('tp1', 'root', '', {
    "host": 'localhost',
    "dialect": 'mysql',
    "logging": false
})

export const startDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
        console.log("La base de datos está lista.")
    } catch (error) {
        console.log("La base de datos no pudo iniciarse.")
    }
}

