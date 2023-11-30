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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../config/redis"));
const accessSecret = process.env.JWT_ACCESS_SECRET;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ error: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, accessSecret);
        if (!decoded)
            return res.status(401).send({ error: 'Error verifying token' });
        const user = decoded;
        req.user = user;
        req.token = token;
        const blacklistedToken = yield redis_1.default.get('BL_' + user.email);
        if (blacklistedToken && blacklistedToken === token) {
            return res.status(401).send({ error: 'Invalid Token' });
        }
        next();
    }
    catch (err) {
        return res.status(401).send({ message: 'Unable To Authenticate User.', data: err });
    }
});
exports.authenticateUser = authenticateUser;
