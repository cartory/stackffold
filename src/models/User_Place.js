"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Place = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class User_Place extends sequelize_2.Model {
}
exports.User_Place = User_Place;
User_Place.init({
    Userid: {
        key: 'Userid',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'User' },
    },
    Placeid: {
        key: 'Placeid',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'Place' },
    },
    startTime: {
        key: 'startTime',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
    },
    endTime: {
        key: 'endTime',
        type: sequelize_2.DataTypes.INTEGER({ length: 5 }),
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
    tableName: 'User_Place',
    deletedAt: false,
    timestamps: false,
});
