"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer.controller");
exports.CustomerRouter = (0, express_1.Router)();
exports.CustomerRouter.get('/', customer_controller_1.getCustomer);
exports.CustomerRouter.post('/', customer_controller_1.createCustomer);
exports.CustomerRouter.delete('/:id', customer_controller_1.deleteCustomer);
exports.CustomerRouter.get('/:id', customer_controller_1.getCustomerDetail);
exports.CustomerRouter.put('/:id', customer_controller_1.updateCustomer);
