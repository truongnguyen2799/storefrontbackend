"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var JWT_SECRET = process.env.JWT_SECRET;
var generateAccessToken = function (account) {
    return jsonwebtoken_1.default.sign({
        data: account,
    }, JSON.stringify(JWT_SECRET), { expiresIn: "600s" });
};
exports.generateAccessToken = generateAccessToken;
var verifyAuthToken = function (request, response, next) {
    try {
        var authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            throw new Error("Authorization header is missing");
        }
        var token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, JSON.stringify(JWT_SECRET));
        next();
    }
    catch (error) {
        response.status(401);
        response.json("Need Login");
    }
};
exports.verifyAuthToken = verifyAuthToken;
