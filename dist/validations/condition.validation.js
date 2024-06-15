"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBabyValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createBabyValidation = (payload) => {
    const schema = joi_1.default.object({
        weight: joi_1.default.number().required(),
        height: joi_1.default.number().required(),
        month: joi_1.default.number().required()
    });
    return schema.validate(payload);
};
exports.createBabyValidation = createBabyValidation;
