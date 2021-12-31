"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Subject extends sequelize_2.Model {
}
exports.Subject = Subject;
Subject.init({
    id: {
        key: 'id',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    code: {
        key: 'code',
        type: sequelize_2.DataTypes.STRING(10),
        unique: true,
    },
    name: {
        key: 'name',
        type: sequelize_2.DataTypes.STRING(100),
    },
    HT: {
        key: 'HT',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
    },
    HP: {
        key: 'HP',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
    },
    HS: {
        key: 'HS',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
    },
    CR: {
        key: 'CR',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'Subject',
    deletedAt: true,
    timestamps: true,
});
