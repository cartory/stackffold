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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTypeController = void 0;
const express_1 = require("@decorators/express");
const models_1 = require("../utils/models");
let PlaceTypeController = class PlaceTypeController {
    findAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield models_1.PlaceType.findAll());
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
                return res.status(200).json(yield models_1.PlaceType.findOne({ where: { id } }));
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
    save(placetype, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json((yield models_1.PlaceType.upsert(placetype))[0]);
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
                return res.status(202).send(yield models_1.PlaceType.destroy({ where: { id } }));
            }
            catch (err) {
                console.error(err);
            }
            return res.status(500).send(null);
        });
    }
};
__decorate([
    (0, express_1.Get)('/'),
    __param(0, (0, express_1.Response)())
], PlaceTypeController.prototype, "findAll", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __param(0, (0, express_1.Params)('id')),
    __param(1, (0, express_1.Response)())
], PlaceTypeController.prototype, "findOne", null);
__decorate([
    (0, express_1.Post)('/'),
    __param(0, (0, express_1.Body)()),
    __param(1, (0, express_1.Response)())
], PlaceTypeController.prototype, "save", null);
__decorate([
    (0, express_1.Delete)('/:id'),
    __param(0, (0, express_1.Params)('id')),
    __param(1, (0, express_1.Response)())
], PlaceTypeController.prototype, "destroy", null);
PlaceTypeController = __decorate([
    (0, express_1.Controller)('/placetypes')
], PlaceTypeController);
exports.PlaceTypeController = PlaceTypeController;
