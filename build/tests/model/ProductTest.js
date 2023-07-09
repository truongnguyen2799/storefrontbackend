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
var database_1 = __importDefault(require("../../database"));
var Product_1 = require("../../models/Product");
var productStore = new Product_1.ProductStore();
describe("Tests for function in Product", function () {
    var id = 0;
    describe("test function index", function () {
        var expectRs = 0;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM \"Product\"";
                        return [4 /*yield*/, conn.query(sql, [])];
                    case 2:
                        result = _a.sent();
                        expectRs = result.rowCount;
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("index product", function () { return __awaiter(void 0, void 0, void 0, function () {
            var products, length;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.index()];
                    case 1:
                        products = _a.sent();
                        length = products.length;
                        expect(length).toBe(expectRs);
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach;
    });
    describe("test function show", function () {
        id = 0;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        console.log("🚀 ~ file: ProductTest.ts:32 ~ beforeEach ~ Client:", database_1.default);
                        sql = "INSERT INTO \"Product\" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [])];
                    case 2:
                        result = _a.sent();
                        id = result.rows[0].id;
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Show  product", function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.show(id)];
                    case 1:
                        product = _a.sent();
                        name = product.name;
                        expect(name).toBe("test1");
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.deleteById(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test function insert", function () {
        id = 0;
        it("Insert product", function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, result, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            id: 1,
                            name: "test1",
                            price: 12,
                            category: "",
                        };
                        return [4 /*yield*/, productStore.insert(product)];
                    case 1:
                        result = _a.sent();
                        id = result[0].id;
                        return [4 /*yield*/, productStore.show(id)];
                    case 2:
                        actual = _a.sent();
                        expect(actual.name).toBe(product.name);
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.deleteById(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test function update", function () {
        id = 0;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO \"Product\" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [])];
                    case 2:
                        result = _a.sent();
                        id = result.rows[0].id;
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Update product", function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            id: id,
                            name: "testupdate",
                            price: 12,
                            category: "",
                        };
                        return [4 /*yield*/, productStore.update(product)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productStore.show(id)];
                    case 2:
                        actual = _a.sent();
                        expect(actual.name).toBe(product.name);
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.deleteById(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("test function show", function () {
        id = 0;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO \"Product\" (name, price, category) VALUES ('test1', 10, 'cate1')RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [])];
                    case 2:
                        result = _a.sent();
                        id = result.rows[0].id;
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        it("Delete product", function () { return __awaiter(void 0, void 0, void 0, function () {
            var actual;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStore.deleteById(id)];
                    case 1:
                        actual = _a.sent();
                        expect(actual).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
