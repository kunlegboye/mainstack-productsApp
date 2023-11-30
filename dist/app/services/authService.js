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
exports.getUserByEmail = exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const redis_1 = __importDefault(require("../config/redis"));
const accessSecret = process.env.JWT_ACCESS_SECRET;
function signup({ name, email, phone_number, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield userModel_1.default.findOne({ $or: [{ email }, { phone_number }] });
        if (existingUser) {
            throw new Error('Email or Phone Number already exists.');
        }
        const user = new userModel_1.default({ name, email, phone_number, password });
        return user.save();
    });
}
exports.signup = signup;
function login({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error('User with email not found');
        }
        const comparePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            throw new Error('Invalid credentials');
        }
        //delete user?.password;
        const accessToken = yield generateToken(email, user.phone_number);
        return { user, accessToken };
    });
}
exports.login = login;
function generateToken(email, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = yield redis_1.default.get(email);
            if (!token) {
                token = yield signToken(email, phone);
            }
            const decoded = jsonwebtoken_1.default.verify(token, accessSecret);
            if (!decoded) {
                token = yield signToken(email, phone);
            }
            return token;
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                const token = yield redis_1.default.get(email);
                return token;
            }
        }
    });
}
function signToken(email, phone) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ email, phone }, accessSecret, { expiresIn: process.env.JWT_ACCESS_TIME });
        yield redis_1.default.set(email, token);
        return token;
    });
}
function logout({ user, token }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield redis_1.default.del(user.email);
        yield redis_1.default.set('BL_' + user.email, token);
    });
}
exports.logout = logout;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userModel_1.default.findOne({ email });
    });
}
exports.getUserByEmail = getUserByEmail;
