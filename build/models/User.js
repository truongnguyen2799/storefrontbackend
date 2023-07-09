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
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = process.env.SALT_ROUNDS
    ? parseInt(process.env.SALT_ROUNDS)
    : 10;
var pepper = "ABCD#12";
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.login = function (account, password) {
        return __awaiter(this, void 0, void 0, function () {
            var check, userCheck, passwordCheck, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        check = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (account == "" || password == "") {
                            return [2 /*return*/, check];
                        }
                        return [4 /*yield*/, this.getByAccount(account)];
                    case 2:
                        userCheck = _a.sent();
                        if (userCheck == null || userCheck.account == "") {
                            return [2 /*return*/, check];
                        }
                        passwordCheck = userCheck.password;
                        if (bcrypt_1.default.compareSync(password + pepper, passwordCheck)) {
                            check = true;
                        }
                        return [2 /*return*/, check];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.insert = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var checkUser, hash, conn, sql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getByAccount(user.account)];
                    case 1:
                        checkUser = _a.sent();
                        if (!(checkUser != null && checkUser.account != "")) return [3 /*break*/, 2];
                        return [2 /*return*/, -1];
                    case 2:
                        hash = bcrypt_1.default.hashSync(user.password + pepper, saltRounds);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 3:
                        conn = _a.sent();
                        sql = "INSERT INTO \"User\" (firstname, lastname, account, password) VALUES ($1, $2, $3, $4)";
                        return [4 /*yield*/, conn.query(sql, [
                                user.firstname,
                                user.lastname,
                                user.account,
                                hash
                            ])];
                    case 4:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, 0];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log("🚀 ~ file: User.ts:64 ~ UserStore ~ insert ~ error:", error_2);
                        throw new Error("Error: ".concat(error_2));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.getByAccount = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM \"User\" AS u WHERE u.account = ($1)";
                        return [4 /*yield*/, conn.query(sql, [account])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Could not get users. Error: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM \"User\"";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("Could not get user. Error: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM \"User\" AS u WHERE u.id = ($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Could not get users. Error: ".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
