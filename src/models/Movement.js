"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movement = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Movement extends sequelize_2.Model {
}
exports.Movement = Movement;
Movement.init({
    id: {
        key: 'id',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    Reasonid: {
        key: 'Reasonid',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: 'id', model: 'MovementReason' },
    },
    description: {
        key: 'description',
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    Equipmentid: {
        key: 'Equipmentid',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: 'id', model: 'Equipment' },
    },
    placeFrom_id: {
        key: 'placeFrom_id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        allowNull: true,
        references: { key: 'id', model: 'Place' },
    },
    placeTo_id: {
        key: 'placeTo_id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        allowNull: true,
        references: { key: 'id', model: 'Place' },
    },
    Userid: {
        key: 'Userid',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        references: { key: 'id', model: 'User' },
        allowNull: true,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'Movement',
    deletedAt: false,
    timestamps: false,
});
