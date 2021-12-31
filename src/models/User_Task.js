"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Task = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class User_Task extends sequelize_2.Model {
}
exports.User_Task = User_Task;
User_Task.init({
    Userid: {
        key: 'Userid',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'User' },
    },
    Taskid: {
        key: 'Taskid',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'Task' },
    },
    startDate: {
        key: 'startDate',
        type: sequelize_2.DataTypes.DATE,
    },
    endDate: {
        key: 'endDate',
        type: sequelize_2.DataTypes.DATE,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'User_Task',
    deletedAt: false,
    timestamps: false,
});
