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
exports.getProductDetail = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = void 0;
const logger_1 = require("../utils/logger");
const prisma_1 = __importDefault(require("../lib/prisma"));
const product_validation_1 = require("../validations/product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, product_validation_1.createProductValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = product-create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const product = yield prisma_1.default.product.create({
            data: {
                name: value.name,
                stock: value.stock,
                price: value.price,
                date_in: value.date_in
            }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: product });
    }
    catch (error) {
        logger_1.logger.error('Err = customer-create', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responses = yield prisma_1.default.product.findMany({
            select: {
                id: true,
                name: true,
                stock: true,
                price: true,
                date_in: true
            }
        });
        logger_1.logger.info('Success get product data');
        return res.status(200).send({ status: true, statusCode: 200, data: responses });
    }
    catch (error) {
        logger_1.logger.error('Err = product-get', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    const { error, value } = (0, product_validation_1.createProductValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = product-update', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const product = yield prisma_1.default.product.update({
            where: {
                id
            },
            data: {
                name: value.name,
                stock: value.stock,
                price: value.price,
                date_in: value.date_in
            }
        });
        if (product) {
            logger_1.logger.info('Success update data product');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' });
        }
        else {
            logger_1.logger.info('Data product not found');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Product not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('Err = product-update', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.product.delete({
            where: {
                id
            }
        });
        if (response) {
            logger_1.logger.info('Success delete product');
            return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' });
        }
        else {
            logger_1.logger.info('Product not found');
            return res.status(404).send({ status: true, statusCode: 404, message: 'Product not found' });
        }
    }
    catch (error) {
        logger_1.logger.error('ERR: delete customer = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.deleteProduct = deleteProduct;
const getProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const response = yield prisma_1.default.product.findFirst({
            where: { id }
        });
        logger_1.logger.info('Success get detail product');
        return res.status(200).send({ status: true, statusCode: 200, data: response });
    }
    catch (error) {
        logger_1.logger.error('ERR: detail-customer = ', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.getProductDetail = getProductDetail;
