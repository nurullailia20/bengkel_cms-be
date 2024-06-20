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
exports.updateUser = exports.getUsers = exports.refreshSession = exports.createSession = exports.userRegistration = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const logger_1 = require("../utils/logger");
const hashing_1 = require("../utils/hashing");
const jwt_1 = require("../utils/jwt");
const prisma_1 = __importDefault(require("../lib/prisma"));
const userRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.createUserValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: user - registration = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
    try {
        value.password = `${(0, hashing_1.hashing)(value.password)}`;
        yield prisma_1.default.user.create({
            data: {
                email: value.email,
                password: value.password,
                name: value.name,
                role: value.role
            }
        });
        logger_1.logger.info('User created');
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'User Registration Successfully'
        });
    }
    catch (error) {
        logger_1.logger.info('ERR: auth - registration = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
});
exports.userRegistration = userRegistration;
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.createSessionValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: user - login = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
    try {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email: req.body.email
            }
        });
        const isValid = (0, hashing_1.checkPassword)(value.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isValid) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: 'Invalid Email or Password'
            });
        }
        const userRole = user.role;
        const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
        const refreshToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1y' });
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Login success', data: { accessToken, refreshToken, userRole } });
    }
    catch (error) {
        logger_1.logger.info('ERR: user - login = ', error.message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
});
exports.createSession = createSession;
const refreshSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.refreshSessionValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: auth - refresh token = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
    try {
        const { decoded } = (0, jwt_1.verifyJWT)(value.refreshToken);
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email: decoded._doc.email
            }
        });
        if (!user)
            return false;
        const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), {
            expiresIn: '1d'
        });
        return res
            .status(200)
            .send({ status: true, statusCode: 200, message: 'Refresh Session Successfully', data: { accessToken } });
    }
    catch (error) {
        logger_1.logger.info('ERR: refresh - token = ', error.message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.message
        });
    }
});
exports.refreshSession = refreshSession;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            where: {
                role: 'CLIENT'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone_number: true,
                total_point: true,
                customer_items: true
            }
        });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Users fetched successfully',
            data: users
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching users:', error);
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, auth_validation_1.updateUserValidation)(req.body);
    if (error) {
        logger_1.logger.info('ERR: user registration - update = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
    const { id } = req.params;
    try {
        // value.password = `${hashing(value.password)}`
        yield prisma_1.default.user.update({
            where: { id },
            data: {
                email: value.email,
                // password: value.password,
                name: value.name,
                phone_number: value.phone_number,
                total_point: value.total_point
            }
        });
        logger_1.logger.info('User created');
        return res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'User Update Successfully'
        });
    }
    catch (error) {
        logger_1.logger.info('ERR: registration update = ', error.details[0].message);
        return res.status(422).send({
            status: false,
            statusCode: 422,
            message: error.details[0].message
        });
    }
});
exports.updateUser = updateUser;
