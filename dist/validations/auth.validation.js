"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSessionValidation = exports.createSessionValidation = exports.updateUserValidation = exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        role: joi_1.default.string().required(),
        phone_number: joi_1.default.string(),
        total_point: joi_1.default.number()
    });
    return schema.validate(payload);
};
exports.createUserValidation = createUserValidation;
const updateUserValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string(),
        // password: Joi.string(),
        name: joi_1.default.string(),
        phone_number: joi_1.default.string(),
        total_point: joi_1.default.number()
    });
    return schema.validate(payload);
};
exports.updateUserValidation = updateUserValidation;
const createSessionValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        userRole: joi_1.default.string().required()
    });
    return schema.validate(payload);
};
exports.createSessionValidation = createSessionValidation;
const refreshSessionValidation = (payload) => {
    const schema = joi_1.default.object({
        refreshToken: joi_1.default.string().required()
    });
    return schema.validate(payload);
};
exports.refreshSessionValidation = refreshSessionValidation;
