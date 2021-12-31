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
const mail_service_1 = __importDefault(require("./mail.service"));
const sequelize_1 = __importDefault(require("../utils/sequelize"));
const randomCode = (digits = 4) => {
    const code = Array(digits).fill(0);
    return code.map((_) => Math.floor(Math.random() * 10)).join("");
};
const checkVerificationCode = (user, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user._attributes.verifiedCode == verificationCode) {
            yield user.update({ isVerified: true });
            return true;
        }
    }
    catch (err) {
        console.error(err);
    }
    return false;
});
const sendVerificationMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { isVerified, verifiedEmail } = user._attributes;
    if (isVerified) {
        return "verifiedEmail Approved";
    }
    if (!verifiedEmail) {
        return "verificationEmail Not Found";
    }
    const verifiedCode = randomCode();
    try {
        const [isSent, _] = yield sequelize_1.default.transaction((t) => {
            return Promise.all([
                //
                mail_service_1.default.sendMail({ to: verifiedEmail }),
                user.update({ verifiedCode: verifiedCode, isVerified: false }, { transaction: t }),
            ]);
        });
        if (!isSent) {
            return "mail Not Sent";
        }
        return "mail Sent";
    }
    catch (err) {
        console.error(err);
        return err.message;
    }
});
exports.default = {
    sendVerificationMail,
    checkVerificationCode,
};
