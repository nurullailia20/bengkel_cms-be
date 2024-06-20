"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
// import {
//   createCustomer,
//   deleteCustomer,
//   getCustomer,
//   getCustomerDetail,
//   updateCustomer
// } from '../controllers/customer.controller'
const product_controller_1 = require("../controllers/product.controller");
const baseRoute_route_1 = require("./baseRoute.route");
const serviceHistory_controller_1 = require("../controllers/serviceHistory.controller");
const customerItem_controller_1 = require("../controllers/customerItem.controller");
const router = (0, express_1.Router)();
// base
router.get('/', baseRoute_route_1.baseRoute);
// auth
router.get('/auth/customers', auth_controller_1.getUsers);
router.post('/auth/register', auth_controller_1.userRegistration);
router.post('/auth/login', auth_controller_1.createSession);
router.post('/auth/refresh', auth_controller_1.refreshSession);
// Customer
router.put('/customer/update/:id', auth_controller_1.updateUser);
// customer item
router.post('/customer-item/add/:id', customerItem_controller_1.createCustomerItem);
router.delete('/customer-item/delete/:id', customerItem_controller_1.deleteCustomerItem);
router.put('/customer-item/update/:id', customerItem_controller_1.updateCustomerItem);
// product
router.get('/product/', product_controller_1.getProduct);
router.post('/product/add/', product_controller_1.createProduct);
router.delete('/product/delete/:id', product_controller_1.deleteProduct);
router.get('/product/detail/:id', product_controller_1.getProductDetail);
router.put('/product/update/:id', product_controller_1.updateProduct);
// service_history
router.post('/service_history', serviceHistory_controller_1.createServiceHistory);
exports.default = router;
