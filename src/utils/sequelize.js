"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
exports.default = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    // logging: false,
    define: {
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        },
    },
    pool: {
        idle: 10000,
        acquire: 3600000,
    },
});
