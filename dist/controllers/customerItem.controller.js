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
exports.deleteCustomerItem = exports.updateCustomerItem = exports.createCustomerItem = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const logger_1 = require("../utils/logger");
const customerItem_validation_1 = require("../validations/customerItem.validation");
const createCustomerItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, customerItem_validation_1.customerItemValidation)(req.body);
    const { params: { id } } = req;
    if (error) {
        logger_1.logger.error('Err = customer item - create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const checkClient = yield prisma_1.default.user.findUnique({
            where: {
                id
            }
        });
        if (!checkClient) {
            return res.status(404).send({ status: false, statusCode: 404, message: 'User not found' });
        }
        const customer = yield prisma_1.default.customer_item.create({
            data: {
                vehicle: value.vehicle,
                police_number: value.police_number,
                user: {
                    connect: {
                        id
                    }
                }
            }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: customer });
    }
    catch (error) {
        logger_1.logger.error('Err =  customer item - create', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createCustomerItem = createCustomerItem;
const updateCustomerItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, customerItem_validation_1.customerItemValidation)(req.body);
    const { params: { id } } = req;
    if (error) {
        logger_1.logger.error('Err = customer item - create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const response = yield prisma_1.default.customer_item.update({
            where: { id },
            data: {
                vehicle: value.vehicle,
                police_number: value.police_number
            }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Mengubah Data', data: response });
    }
    catch (error) {
        logger_1.logger.error('Err =  customer item - update', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.updateCustomerItem = updateCustomerItem;
const deleteCustomerItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.customer_item.delete({
            where: { id }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' });
    }
    catch (error) {
        logger_1.logger.error('Err =  customer item - delete', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.deleteCustomerItem = deleteCustomerItem;
