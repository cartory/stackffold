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
exports.EquipmentController = void 0;
const express_1 = require("@decorators/express");
const models_1 = require("../utils/models");
const movement_service_1 = __importDefault(require("../services/movement.service"));
let EquipmentController = class EquipmentController {
    findAll(query, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 0, limit = 10, placeId } = query;
            try {
                const equipments = yield models_1.Equipment.findAll({
                    offset: page * limit,
                    limit: Number.parseInt(limit),
                    where: placeId && { Placeid: placeId },
                    include: [
                        "unit",
                        "place",
                        {
                            model: models_1.Movement,
                            as: "movements",
                            include: [
                                "reason",
                                {
                                    model: models_1.Place,
                                    as: "placeTo",
                                    include: ["type"],
                                },
                                {
                                    model: models_1.Place,
                                    as: "placeFrom",
                                    include: ["type"],
                                },
                            ],
                        },
                    ],
                });
                return res.status(200).json(equipments);
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send([]);
        });
    }
    findOne(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipment = yield models_1.Equipment.findOne({
                    where: { id },
                    include: [
                        "unit",
                        "place",
                        {
                            model: models_1.Movement,
                            as: "movements",
                            include: [
                                "reason",
                                {
                                    model: models_1.Place,
                                    as: "placeTo",
                                    include: ["type"],
                                },
                                {
                                    model: models_1.Place,
                                    as: "placeFrom",
                                    include: ["type"],
                                },
                            ],
                        },
                    ],
                });
                return res.status(200).json(equipment);
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
    makeMovement(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movement, equipmentIDs = [] } = body;
            try {
                const result = yield movement_service_1.default.makeTransaction(movement, equipmentIDs);
                return res.status(201).send(result);
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(false);
        });
    }
    save(equipment, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json((yield models_1.Equipment.upsert(equipment))[0]);
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
                return res.status(202).send(yield models_1.Equipment.destroy({ where: { id } }));
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
    __param(0, (0, express_1.Query)()),
    __param(1, (0, express_1.Response)())
], EquipmentController.prototype, "findAll", null);
__decorate([
    (0, express_1.Get)("/:id"),
    __param(0, (0, express_1.Params)("id")),
    __param(1, (0, express_1.Response)())
], EquipmentController.prototype, "findOne", null);
__decorate([
    (0, express_1.Post)("/movement"),
    __param(0, (0, express_1.Body)()),
    __param(1, (0, express_1.Response)())
], EquipmentController.prototype, "makeMovement", null);
__decorate([
    (0, express_1.Post)("/"),
    __param(0, (0, express_1.Body)()),
    __param(1, (0, express_1.Response)())
], EquipmentController.prototype, "save", null);
__decorate([
    (0, express_1.Delete)("/:id"),
    __param(0, (0, express_1.Params)("id")),
    __param(1, (0, express_1.Response)())
], EquipmentController.prototype, "destroy", null);
EquipmentController = __decorate([
    (0, express_1.Controller)("/equipments")
], EquipmentController);
exports.EquipmentController = EquipmentController;
