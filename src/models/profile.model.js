import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"

export const Profile = sequelize.define("profile", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING(200),
        allowNull: true
},

    avatar_url: {
        type: DataTypes.STRING(255),
        allowNull: true
},

birth_date: {
type: DataType.DATE,
allowNull: false
}
})