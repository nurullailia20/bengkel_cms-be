"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerItemValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const customerItemValidation = (payload) => {
    const schema = joi_1.default.object({
        vehicle: joi_1.default.string().required(),
        police_number: joi_1.default.string().required()
    });
    return schema.validate(payload);
};
exports.customerItemValidation = customerItemValidation;
