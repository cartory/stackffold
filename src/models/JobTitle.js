"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTitle = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class JobTitle extends sequelize_2.Model {
}
exports.JobTitle = JobTitle;
JobTitle.init({
    id: {
        key: "id",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        key: "name",
        type: sequelize_2.DataTypes.STRING(100),
    },
    description: {
        key: "description",
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    supJopTitleId: {
        key: "supJopTitleId",
        type: sequelize_2.DataTypes.INTEGER({ length: 11 }),
        allowNull: true,
        references: { key: "id", model: "JobTitle" },
    },
}, {
    sequelize: sequelize_1.default,
    tableName: "JobTitle",
    deletedAt: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ["supJopTitleId"],
        },
    },
});
