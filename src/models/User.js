"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class User extends sequelize_2.Model {
}
exports.User = User;
User.init({
    id: {
        key: 'id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    uid: {
        key: 'uid',
        type: sequelize_2.DataTypes.STRING(50),
        unique: true,
    },
    name: {
        key: 'name',
        type: sequelize_2.DataTypes.STRING(50),
    },
    email: {
        key: 'email',
        type: sequelize_2.DataTypes.STRING(50),
        unique: true,
    },
    verifiedEmail: {
        key: 'verifiedEmail',
        type: sequelize_2.DataTypes.STRING(50),
        unique: true,
        allowNull: true,
    },
    photoUrl: {
        key: 'photoUrl',
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    password: {
        key: 'password',
        type: sequelize_2.DataTypes.STRING(255),
    },
    phoneNumber: {
        key: 'phoneNumber',
        type: sequelize_2.DataTypes.STRING(20),
        allowNull: true,
    },
    verifiedCode: {
        key: 'verifiedCode',
        type: sequelize_2.DataTypes.STRING(10),
        allowNull: true,
    },
    isVerified: {
        key: 'isVerified',
        type: sequelize_2.DataTypes.BOOLEAN,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'User',
    deletedAt: true,
    timestamps: true,
});
