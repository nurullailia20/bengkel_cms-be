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
exports.createServiceHistory = void 0;
const logger_1 = require("../utils/logger");
const prisma_1 = __importDefault(require("../lib/prisma"));
const serviceHistory_validation_1 = require("../validations/serviceHistory.validation");
const createServiceHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.query;
    const { error, value } = (0, serviceHistory_validation_1.createServiceHistoryValidation)(req.body);
    if (error) {
        logger_1.logger.error('Err = service history - create', error.details[0].message);
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message });
    }
    try {
        const response = yield prisma_1.default.service_history.create({
            data: {
                user_id: user_id,
                description: value.description,
                recomendation: value.recomendation,
                date: value.date
            },
            include: {
                user: true
            }
        });
        return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menambahkan Data', data: response });
    }
    catch (error) {
        logger_1.logger.error('Err = service history - create', error);
        return res.status(422).send({ status: false, statusCode: 422, message: error });
    }
});
exports.createServiceHistory = createServiceHistory;
// export const updateCustomer = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req
//   const { error, value } = createCustomerValidation(req.body)
//   if (error) {
//     logger.error('Err = customer-update', error.details[0].message)
//     return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
//   }
//   try {
//     const customer = await prisma.customer.update({
//       where: {
//         id
//       },
//       data: {
//         name: value.name,
//         vehicle: value.vehicle,
//         police_number: value.police_number,
//         total_point: value.total_point,
//         phone_number: value.phone_number
//       }
//     })
//     if (customer) {
//       logger.info('Success update new baby')
//       return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Memperbarui Data' })
//     } else {
//       logger.info('Baby not fount')
//       return res.status(404).send({ status: true, statusCode: 404, message: 'Baby not found' })
//     }
//   } catch (error) {
//     logger.error('Err = baby-update', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }
// export const deleteCustomer = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req
//   try {
//     const response = await prisma.customer.delete({
//       where: {
//         id
//       }
//     })
//     if (response) {
//       logger.info('Success delete customer')
//       return res.status(200).send({ status: true, statusCode: 200, message: 'Berhasil Menghapus Data' })
//     } else {
//       logger.info('Baby not found')
//       return res.status(404).send({ status: true, statusCode: 404, message: 'Customer not found' })
//     }
//   } catch (error) {
//     logger.error('ERR: delete customer = ', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }
// export const getCustomerDetail = async (req: Request, res: Response) => {
//   const {
//     params: { id }
//   } = req
//   try {
//     const response = await prisma.customer.findFirst({
//       where: { id }
//     })
//     logger.info('Success get detail customer')
//     return res.status(200).send({ status: true, statusCode: 200, data: response })
//   } catch (error) {
//     logger.error('ERR: detail-customer = ', error)
//     return res.status(422).send({ status: false, statusCode: 422, message: error })
//   }
// }
