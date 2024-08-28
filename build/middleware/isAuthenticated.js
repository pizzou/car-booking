"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedDriver = exports.isAuthenticated = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "Please Log in to access this content!" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const userData = await prisma_1.default.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            // Attach the user data to the request object
            req.user = userData;
            next();
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.isAuthenticated = isAuthenticated;
const isAuthenticatedDriver = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "Please Log in to access this content!" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const driverData = await prisma_1.default.driver.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            // Attach the user data to the request object
            req.driver = driverData;
            next();
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.isAuthenticatedDriver = isAuthenticatedDriver;
