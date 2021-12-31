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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const sequelize_1 = __importDefault(require("./utils/sequelize"));
const adminjs_1 = __importDefault(require("adminjs"));
const express_2 = __importDefault(require("@adminjs/express"));
const sequelize_2 = __importDefault(require("@adminjs/sequelize"));
const app = (0, express_1.default)();
// ADMINJS
adminjs_1.default.registerAdapter(sequelize_2.default);
const admin = new adminjs_1.default({
    rootPath: "/admin",
    databases: [sequelize_1.default],
    resources: sequelize_1.default.modelManager.all,
});
const adminRouter = express_2.default.buildRouter(admin);
// DB CONNECTION
sequelize_1.default
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // await sequelize.sync({ logging: true })
    console.log(`\x1b[32mDB Connected Sucessfully!\x1b[0m`);
    process.env.NODE_ENV === "development" && (yield admin.watch());
}))
    .catch((err) => {
    console.error(err);
    process.exit(0);
});
app
    // SETUP
    .use((0, cors_1.default)())
    .use(express_1.default.urlencoded({ extended: true }))
    .use(express_1.default.json({ limit: process.env.BODY_SIZE }))
    // ROUTES
    .use("/api", router_1.default)
    .use(admin.options.rootPath, adminRouter)
    .get("/", (_, res) => res.send("<h1>Welcome to Generated API 👋 </h1>"));
app.listen(process.env.PORT || 3000, () => {
    process.env.NODE_ENV === "development" && app.use(require("morgan")("dev"));
    console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`);
    console.log(new Date());
});
