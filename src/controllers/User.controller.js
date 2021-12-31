"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const express_1 = require("@decorators/express");
const models_1 = require("../utils/models");
const auth_service_1 = __importDefault(require("../services/auth.service"));
let UserController = class UserController {
    findAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield models_1.User.findAll());
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send([]);
        });
    }
    findOne(id, query, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verifiedCode, sendMail = false } = query;
            try {
                const user = yield models_1.User.findOne({ where: { id } });
                if (verifiedCode) {
                    return res.status(202).send(yield auth_service_1.default.checkVerificationCode(user, verifiedCode));
                }
                if (sendMail) {
                    return res.status(202).send(yield auth_service_1.default.sendVerificationMail(user));
                }
                return res.status(200).json(user);
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
    save(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json((yield models_1.User.upsert(user))[0]);
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
    destroy(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(202).send(yield models_1.User.destroy({ where: { id } }));
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
};
__decorate([
    (0, express_1.Get)("/"),
    __param(0, (0, express_1.Response)())
], UserController.prototype, "findAll", null);
__decorate([
    (0, express_1.Get)("/:id"),
    __param(0, (0, express_1.Params)("id")),
    __param(1, (0, express_1.Query)()),
    __param(2, (0, express_1.Response)())
], UserController.prototype, "findOne", null);
__decorate([
    (0, express_1.Post)("/"),
    __param(0, (0, express_1.Body)()),
    __param(1, (0, express_1.Response)())
], UserController.prototype, "save", null);
__decorate([
    (0, express_1.Delete)("/:id"),
    __param(0, (0, express_1.Params)("id")),
    __param(1, (0, express_1.Response)())
], UserController.prototype, "destroy", null);
UserController = __decorate([
    (0, express_1.Controller)("/users")
], UserController);
exports.UserController = UserController;
