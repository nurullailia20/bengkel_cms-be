"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToRupiah = exports.getMonth = exports.dateFormatter = exports.calculateAgeInMonths = void 0;
const moment_1 = __importDefault(require("moment"));
const calculateAgeInMonths = (birthDate) => {
    const currentDate = (0, moment_1.default)();
    const formattedBirthDate = (0, moment_1.default)(birthDate);
    const ageInMonths = currentDate.diff(formattedBirthDate, 'months');
    return ageInMonths;
};
exports.calculateAgeInMonths = calculateAgeInMonths;
const dateFormatter = (date, format = 'DD MMM YYYY') => {
    return (0, moment_1.default)(date).format(format);
};
exports.dateFormatter = dateFormatter;
const getMonth = (date) => (0, moment_1.default)(date).month();
exports.getMonth = getMonth;
const convertToRupiah = (input) => {
    const number = parseInt(input, 10);
    if (isNaN(number)) {
        return 'Invalid number';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};
exports.convertToRupiah = convertToRupiah;
