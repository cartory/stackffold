"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const sequelize_2 = require("sequelize");
/**
 * Made with mySQL syntax
 * This function make the transaction with one SQL query for performance
 * @param movement is the movement for transaction
 * @param ids are the number of equipment for transaction for movement
 * @returns {Promise<boolean>} false if transaction fails
 */
const makeTransaction = (movement, ids = []) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ids.length) {
        return false;
    }
    const COLUMNS = Object.keys(movement).join(",");
    const ROWS = ids.map((id) => `(${Object.values(Object.assign(Object.assign({}, movement), { Equipmentid: id })).join(",")})`).join(",");
    const sqlInsert = `INSERT INTO Movement (${COLUMNS}) VALUES ${ROWS}`;
    const sqlUpdate = `UPDATE Equipment SET Placeid = ${movement.placeTo_id} WHERE id IN (${ids.join(",")})`;
    try {
        yield sequelize_1.default.transaction((t) => {
            return Promise.all([
                // INSERT && UPDATE
                sequelize_1.default.query(sqlInsert, { transaction: t, type: sequelize_2.QueryTypes.INSERT }),
                sequelize_1.default.query(sqlUpdate, { transaction: t, type: sequelize_2.QueryTypes.UPDATE }),
            ]);
        });
        return true;
    }
    catch (err) {
        console.error(err);
    }
    return false;
});
exports.default = {
    makeTransaction,
};
