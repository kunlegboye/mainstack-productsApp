"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./app/routes/authRoutes"));
const productRoute_1 = __importDefault(require("./app/routes/productRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
if (!process.env.MONGODB_URL) {
    console.error('MONGODB_URL is not defined in the environment variables.');
    process.exit(1);
}
// Routes
app.use('/v1/api', authRoutes_1.default);
app.use('/v1/api/products', productRoute_1.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
if (process.env.NODE_ENV !== 'test') {
    mongoose_1.default.connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error(err, 'err'));
}
// mongoose.connect(process.env.MONGODB_URL as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as mongoose.ConnectOptions)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error(err, 'err'));
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    const status = err instanceof http_errors_1.default.HttpError ? err.status : 500;
    res.status(status).send({
        message: `Route '${req.path}', NOT found`,
        status: 'error'
    });
});
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});
exports.default = app;
