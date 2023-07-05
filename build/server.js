"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var ProductController_1 = __importDefault(require("./controller/ProductController"));
var UserController_1 = __importDefault(require("./controller/UserController"));
var OrderController_1 = __importDefault(require("./controller/OrderController"));
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
(0, ProductController_1.default)(app);
(0, UserController_1.default)(app);
(0, OrderController_1.default)(app);
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
exports.default = app;
