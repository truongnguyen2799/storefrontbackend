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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var dotenv_1 = __importDefault(require("dotenv"));
var authen_1 = require("../authen");
dotenv_1.default.config();
var userStore = new User_1.UserStore();
var login = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var account, password, check, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                account = request.body.account;
                password = request.body.password;
                return [4 /*yield*/, userStore.login(account, password)];
            case 1:
                check = _a.sent();
                if (check) {
                    token = (0, authen_1.generateAccessToken)(account);
                    response.status(200);
                    response.json({ token: token });
                }
                else {
                    response.status(400);
                    response.json("Account or password not valid");
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                response.status(400);
                response.json("Have error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userStore.index()];
            case 1:
                users = _a.sent();
                response.status(200);
                response.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                response.status(401);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(request.params.id);
                return [4 /*yield*/, userStore.getById(id)];
            case 1:
                user = _a.sent();
                response.json(user);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                response.json("Have error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var insert = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    id: 0,
                    firstname: request.body.firstname,
                    lastname: request.body.lastname,
                    password: request.body.password,
                    account: request.body.account,
                };
                return [4 /*yield*/, userStore.insert(user)];
            case 1:
                result = _a.sent();
                switch (result) {
                    case -1:
                        response.status(400);
                        response.json("account existed");
                        break;
                    case 0:
                        response.status(200);
                        response.json("Success");
                        break;
                    default:
                        break;
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                response.status(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var userController = function (app) {
    app.post("/login", login);
    app.get("/user/all", authen_1.verifyAuthToken, index);
    app.get("/user/show/:id", authen_1.verifyAuthToken, show);
    app.post("/user/insert", insert);
};
exports.default = userController;
