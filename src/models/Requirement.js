"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requirement = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Requirement extends sequelize_2.Model {
}
exports.Requirement = Requirement;
Requirement.init({
    id: {
        key: 'id',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    subjectReqId: {
        key: 'subjectReqId',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: 'id', model: 'Subject' },
    },
    subjectPreqId: {
        key: 'subjectPreqId',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: 'id', model: 'Subject' },
    },
    Careerid: {
        key: 'Careerid',
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: 'id', model: 'Career' },
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'Requirement',
    deletedAt: false,
    timestamps: false,
});
