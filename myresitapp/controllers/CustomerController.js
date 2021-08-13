const {
    ObjectId
} = require('mongodb');
//customer model
const Customer = require('../models/customer');

//customer controller
class CustomerController {
    //Getting all list of customers
    getAll(req, res) {
        Customer.find({}, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }

    //add customer
    add(req, res) {
        let {
            name,
            address,
            property_id,
            property_price
        } = req.body;

        Customer.find({
            name: name
        }, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                let new_customer = new Customer({
                    name: name,
                    address: address,
                    property_id: property_id,
                    property_price: property_price
                });
                new_customer.save(function (err, result) {
                    if (err) throw err;
                    if (result) {
                        res.status(201).json({
                            message: "Correctly created!"
                        })
                    }
                });
            } else {
                res.status(409).json({
                    errorr: "Already existing customer"
                })
            }
        });
    }

    //delete customer
    delete(req, res) {
        let id = ObjectId(req.params.id);

        Customer.deleteOne({
            _id: id
        }, function (err, result) {
            if (err) throw err;
            if (result.deletedCount == 1) {
                res.status(204).json({
                    message: "Success deleted!"
                })
            } else {
                res.status(404).json({
                    error: "Not existing customer!"
                })
            }
        });
    }
}

module.exports = CustomerController;