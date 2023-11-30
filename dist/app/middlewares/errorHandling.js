"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
const errorHandler = function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(404).send({
        message: `Route '${req.path}', NOT found...`,
        status: 'error'
    });
    res.status(err.status || 500);
};
__1.default.use(errorHandler);
exports.default = __1.default;
