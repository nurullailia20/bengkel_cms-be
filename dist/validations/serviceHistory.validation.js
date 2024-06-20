"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceHistoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createServiceHistoryValidation = (payload) => {
    const schema = joi_1.default.object({
        description: joi_1.default.string().required(),
        recomendation: joi_1.default.number().required(),
        date: joi_1.default.date()
    });
    return schema.validate(payload);
};
exports.createServiceHistoryValidation = createServiceHistoryValidation;
