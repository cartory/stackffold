"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@decorators/express");
const User_controller_1 = require("./controllers/User.controller");
const Task_controller_1 = require("./controllers/Task.controller");
const Place_controller_1 = require("./controllers/Place.controller");
const Career_controller_1 = require("./controllers/Career.controller");
const Subject_controller_1 = require("./controllers/Subject.controller");
const JobTitle_controller_1 = require("./controllers/JobTitle.controller");
const PlaceType_controller_1 = require("./controllers/PlaceType.controller");
const Equipment_controller_1 = require("./controllers/Equipment.controller");
const EquipmentUnit_controller_1 = require("./controllers/EquipmentUnit.controller");
const EquipmentType_controller_1 = require("./controllers/EquipmentType.controller");
const EquipmentBrand_controller_1 = require("./controllers/EquipmentBrand.controller");
const MovementReason_controller_1 = require("./controllers/MovementReason.controller");
const router = (0, express_1.Router)();
(0, express_2.attachControllers)(router, [
    User_controller_1.UserController,
    Task_controller_1.TaskController,
    Place_controller_1.PlaceController,
    Career_controller_1.CareerController,
    Subject_controller_1.SubjectController,
    JobTitle_controller_1.JobTitleController,
    PlaceType_controller_1.PlaceTypeController,
    Equipment_controller_1.EquipmentController,
    EquipmentUnit_controller_1.EquipmentUnitController,
    EquipmentType_controller_1.EquipmentTypeController,
    EquipmentBrand_controller_1.EquipmentBrandController,
    MovementReason_controller_1.MovementReasonController,
]);
exports.default = router;
