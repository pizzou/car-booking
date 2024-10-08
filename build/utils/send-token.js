"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// send token
const sendToken = async (user, res) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
    });
    res.status(201).json({
        success: true,
        accessToken,
        user,
    });
};
exports.sendToken = sendToken;
