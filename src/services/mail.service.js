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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailTransport = nodemailer_1.default.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendMail = (mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageInfo = yield mailTransport.sendMail({
            from: process.env.MAIL_USER,
            to: mailOptions.to,
            subject: mailOptions.subject,
            text: mailOptions.text,
        });
        console.table([messageInfo]);
        return true;
    }
    catch (err) {
        console.error(err);
    }
    return false;
});
exports.sendMail = sendMail;
exports.default = {
    sendMail: exports.sendMail,
};
