"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const customer_controller_1 = require("../controllers/customer.controller");
const product_controller_1 = require("../controllers/product.controller");
const baseRoute_route_1 = require("./baseRoute.route");
const router = (0, express_1.Router)();
// base
router.get('/', baseRoute_route_1.baseRoute);
// auth
router.get('auth/', auth_controller_1.getUsers);
router.post('auth/register', auth_controller_1.userRegistration);
router.post('auth/login', auth_controller_1.createUserSession);
router.post('auth/refresh', auth_controller_1.refreshSession);
// Customer
router.get('customer/', customer_controller_1.getCustomer);
router.post('customer/', customer_controller_1.createCustomer);
router.delete('customer/:id', customer_controller_1.deleteCustomer);
router.get('customer/:id', customer_controller_1.getCustomerDetail);
router.put('customer/:id', customer_controller_1.updateCustomer);
// product
router.get('product/', product_controller_1.getProduct);
router.post('product/', product_controller_1.createProduct);
router.delete('product/:id', product_controller_1.deleteProduct);
router.get('product/:id', product_controller_1.getProductDetail);
router.put('product/:id', product_controller_1.updateProduct);
exports.default = router;
