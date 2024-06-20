"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
const express_1 = __importDefault(require("express"));
const logger_1 = require("./utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const deserializedToken_1 = __importDefault(require("./middleware/deserializedToken"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 4000;
// parse body req
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// cors access handler
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use(deserializedToken_1.default);
app.use('/api/v1/', routes_1.default);
app.listen(port, () => {
    logger_1.logger.info(`Listening on http://localhost:${port}/api/v1/`);
});
exports.default = app;
