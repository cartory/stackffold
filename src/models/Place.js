"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Place extends sequelize_2.Model {
}
exports.Place = Place;
Place.init({
    id: {
        key: "id",
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    code: {
        key: "code",
        type: sequelize_2.DataTypes.STRING(20),
        unique: true,
    },
    name: {
        key: "name",
        type: sequelize_2.DataTypes.STRING(255),
    },
    description: {
        key: "description",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    Typeid: {
        key: "Typeid",
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        references: { key: "id", model: "PlaceType" },
    },
    photoUrl: {
        key: "photoUrl",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: sequelize_1.default,
    tableName: "Place",
    deletedAt: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["Typeid"],
        },
    },
});
