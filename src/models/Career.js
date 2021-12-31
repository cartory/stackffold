"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Career = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Career extends sequelize_2.Model {
}
exports.Career = Career;
Career.init({
    id: {
        key: "id",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    creationDate: {
        key: "creationDate",
        type: sequelize_2.DataTypes.DATE,
    },
    code: {
        key: "code",
        type: sequelize_2.DataTypes.STRING(10),
        unique: true,
    },
    name: {
        key: "name",
        type: sequelize_2.DataTypes.STRING(100),
    },
    duration: {
        key: "duration",
        type: sequelize_2.DataTypes.TINYINT,
    },
    educationLevel: {
        key: "educationLevel",
        type: sequelize_2.DataTypes.STRING(100),
    },
    academicTitle: {
        key: "academicTitle",
        type: sequelize_2.DataTypes.STRING(100),
    },
    midTitle: {
        key: "midTitle",
        type: sequelize_2.DataTypes.STRING(100),
    },
    nationalTitle: {
        key: "nationalTitle",
        type: sequelize_2.DataTypes.STRING(100),
    },
    fax: {
        key: "fax",
        type: sequelize_2.DataTypes.STRING(20),
    },
    email: {
        key: "email",
        type: sequelize_2.DataTypes.STRING(100),
    },
    blog: {
        key: "blog",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    location: {
        key: "location",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    web: {
        key: "web",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    Placeid: {
        key: "Placeid",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        allowNull: true,
        references: { key: "id", model: "Place" },
    },
}, {
    sequelize: sequelize_1.default,
    tableName: "Career",
    deletedAt: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["Placeid"],
        },
    },
});
