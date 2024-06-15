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
exports.getCustomerDetail = exports.deleteCustomer = exports.updateCustomer = exports.getCustomer = exports.createCustomer = void 0;
const logger_1 = require("../utils/logger");
const prisma_1 = __importDefault(require("../lib/prisma"));
const customer_validation_1 = require("../validations/customer.validation");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, customer_validation_1.createCustomerValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = customer-create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const customer = yield prisma_1.default.customer.create({
            data: {
                name: value.name,
                vehicle: value.vehicle,
                police_number: value.police_number,
                total_point: value.total_point,
                phone_number: value.phone_number
            }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: customer });
    }
    catch (error) {
        logger_1.logger.error('Err = customer-create', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createCustomer = createCustomer;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responses = yield prisma_1.default.customer.findMany({
            select: {
                id: true,
                name: true,
                vehicle: true,
                police_number: true,
                total_point: true,
                phone_number: true
            }
        });
        logger_1.logger.info('Success get customer data');
        return res.status(200).send({ status: true, statusCode: 200, data: responses });
    }
    catch (error) {
        logger_1.logger.error('Err = customer-get', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getCustomer = getCustomer;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    const { error, value } = (0, customer_validation_1.createCustomerValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = customer-update', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const customer = yield prisma_1.default.customer.update({
            where: {
                id
            },
            data: {
                name: value.name,
                vehicle: value.vehicle,
                police_number: value.police_number,
                total_point: value.total_point,
                phone_number: value.phone_number
            }
        });
        if (customer) {
            logger_1.logger.info('Success update new baby');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' });
        }
        else {
            logger_1.logger.info('Baby not fount');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('Err = baby-update', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.customer.delete({
            where: {
                id
            }
        });
        if (response) {
            logger_1.logger.info('Success delete customer');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' });
        }
        else {
            logger_1.logger.info('Baby not found');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Customer not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('ERR: delete customer = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.deleteCustomer = deleteCustomer;
const getCustomerDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.customer.findFirst({
            where: { id }
        });
        logger_1.logger.info('Success get detail customer');
        return res.status(200).send({ status: true, statusCode: 200, data: response });
    }
    catch (error) {
        logger_1.logger.error('ERR: detail-customer = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getCustomerDetail = getCustomerDetail;
