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
exports.querySubjects = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../utils/sequelize"));
const querySubjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT DISTINCT s.*
    FROM Subject s
        JOIN Subject_Career sc ON id = sc.Subjectid
        JOIN Career c ON sc.Careerid = c.id
    WHERE
        s.deletedAt is null
        and ${query.semester != null ? `sc.semester = ${query.semester}` : "true"} 
        and ${query.careerId != null ? `c.id = ${query.careerId}` : "true"}
    LIMIT ${query.limit}
    OFFSET ${query.offset * query.limit}`;
    try {
        const subjects = yield sequelize_2.default.query(sql, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        return subjects.map((subject) => {
            delete subject["deletedAt"];
            delete subject["createdAt"];
            delete subject["updatedAt"];
            return subject;
        });
    }
    catch (err) {
        console.error(err);
    }
    return [];
});
exports.querySubjects = querySubjects;
