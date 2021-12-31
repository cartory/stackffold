"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place_Place = void 0;
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
class Place_Place extends sequelize_2.Model {
}
exports.Place_Place = Place_Place;
Place_Place.init({
    placeParent_id: {
        key: 'placeParent_id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'Place' },
    },
    placeChild_id: {
        key: 'placeChild_id',
        type: sequelize_2.DataTypes.INTEGER({ length: 10 }),
        primaryKey: true,
        references: { key: 'id', model: 'Place' },
    },
}, {
    sequelize: sequelize_1.default,
    tableName: 'Place_Place',
    deletedAt: false,
    timestamps: false,
});
