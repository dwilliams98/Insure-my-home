const express = require('express'),
    router = express.Router();

const {
    RegisterController
} = require('../controllers/RegisterController');
const {
    LoginController
} = require('../controllers/LoginController');
const CustomerController = require('../controllers/CustomerController');
const ClaimController = require('../controllers/ClaimController');

//index Page
router.get("/", (req, res) => res.render("home"));
//register Page
router.get("/register", (req, res) => res.render("register"));
//login page
router.get("/login", (req, res) => res.render("login"));
//customer list page
router.get("/customers", (req, res) => res.render("customers"));
//add customer page
router.get("/customer/add", (req, res) => res.render("customer/add"));

//user register
router.post('/register', (req, res) => {
    RegisterController(req, res);
});
//user login
router.post('/login', (req, res) => {
    LoginController(req, res);
});
//Getting all list of customers
router.get('/customers/list', (req, res) => {
    let customerController = new CustomerController();
    customerController.getAll(req, res);
});
//add customer
router.post('/add/customer', (req, res) => {
    let customerController = new CustomerController();
    customerController.add(req, res);
});
//delete customer
router.delete('/customer/:id', (req, res) => {
    let customerController = new CustomerController();
    customerController.delete(req, res);
});
//report
router.post('/report', (req, res) => {
    let claimController = new ClaimController();
    claimController.report(req, res);
});
//getting report data by customer_id
router.get('/report/:id', (req, res) => {
    let claimController = new ClaimController();
    claimController.getReport(req, res);
});

module.exports = router;