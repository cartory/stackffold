"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Task extends sequelize_2.Model {
}
exports.Task = Task;
Task.init({
    id: {
        key: "id",
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        key: "name",
        type: sequelize_2.DataTypes.STRING(50),
    },
    description: {
        key: "description",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    deadLine: {
        key: "deadLine",
        type: sequelize_2.DataTypes.DATE,
    },
    status: {
        key: "status",
        type: sequelize_2.DataTypes.BOOLEAN,
    },
    Placeid: {
        key: "Placeid",
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        allowNull: true,
        references: { key: "id", model: "Place" },
    },
    photoUrl: {
        key: "photoUrl",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: "Task",
    deletedAt: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["Placeid"],
        },
    },
});
