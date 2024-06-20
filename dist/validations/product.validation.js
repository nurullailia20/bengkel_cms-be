"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createProductValidation = (payload) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        stock: joi_1.default.number().required(),
        price: joi_1.default.string().required(),
        date_in: joi_1.default.date(),
        description: joi_1.default.string().required(),
        warranty: joi_1.default.number().required(),
        color: joi_1.default.string().required(),
        image: joi_1.default.string().required()
    });
    return schema.validate(payload);
};
exports.createProductValidation = createProductValidation;
