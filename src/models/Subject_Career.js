"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject_Career = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Subject_Career extends sequelize_2.Model {
}
exports.Subject_Career = Subject_Career;
Subject_Career.init({
    Subjectid: {
        key: 'Subjectid',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        references: { key: 'id', model: 'Subject' },
    },
    Careerid: {
        key: 'Careerid',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        references: { key: 'id', model: 'Career' },
    },
    semester: {
        key: 'semester',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'Subject_Career',
    deletedAt: false,
    timestamps: false,
});
