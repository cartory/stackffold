"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equipment = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Equipment extends sequelize_2.Model {
}
exports.Equipment = Equipment;
Equipment.init({
    id: {
        key: "id",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    description: {
        key: "description",
        type: sequelize_2.DataTypes.TEXT,
    },
    code: {
        key: "code",
        type: sequelize_2.DataTypes.STRING(100),
        unique: true,
    },
    photoUrl: {
        key: "photoUrl",
        type: sequelize_2.DataTypes.STRING(255),
        allowNull: true,
    },
    state: {
        key: "state",
        type: sequelize_2.DataTypes.STRING(50),
    },
    observations: {
        key: "observations",
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    Unitid: {
        key: "Unitid",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: "id", model: "EquipmentUnit" },
    },
    Placeid: {
        key: "Placeid",
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        allowNull: true,
        references: { key: "id", model: "Place" },
    },
    EquipmentBrandid: {
        key: "EquipmentBrandid",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: "id", model: "EquipmentBrand" },
    },
    EquipmentTypeid: {
        key: "EquipmentTypeid",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        references: { key: "id", model: "EquipmentType" },
    },
}, {
    sequelize: sequelize_1.default,
    tableName: "Equipment",
    deletedAt: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["Unitid", "Placeid", "EquipmentBrandid", "EquipmentTypeid"],
        },
    },
});
