import { sequelize } from "../config/database.js"
import { DataTypes } from "sequelize"
import { User } from "./user.model.js"

export const Tag = sequelize.define("tag", {
    
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},

{ timestaps: true } 
)
