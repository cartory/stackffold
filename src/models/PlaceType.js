"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceType = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class PlaceType extends sequelize_2.Model {
}
exports.PlaceType = PlaceType;
PlaceType.init({
    id: {
        key: 'id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        key: 'name',
        type: sequelize_2.DataTypes.STRING(50),
        unique: true,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'PlaceType',
    deletedAt: true,
    timestamps: true,
});
