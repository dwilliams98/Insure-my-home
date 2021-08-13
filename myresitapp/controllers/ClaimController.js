const {
    ObjectId
} = require('mongodb');
//claim model
const Claim = require('../models/claim');

//claim controller
class ClaimController {
    //Report a customer's claim
    report(req, res) {
        let {
            year,
            customer_id,
            damage_amount,
            damage_type
        } = req.body;

        Claim.find({
            customer_id: ObjectId(customer_id)
        }, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                let claim = new Claim({
                    year: year,
                    customer_id: ObjectId(customer_id),
                    damage_amount: damage_amount,
                    damage_type: damage_type
                })
                claim.save(function (err1, result1) {
                    if (err1) throw err1;
                    if (result1) {
                        res.status(201).json({
                            message: "Correctly created!"
                        })
                    }
                })
            } else {
                let claim = result[0];
                claim.year = year;
                claim.customer_id = ObjectId(customer_id);
                claim.damage_amount = damage_amount;
                claim.damage_type = damage_type;
                claim.save(function (err2, result2) {
                    if (err2) throw err2;
                    if (result1) {
                        res.status(200).json({
                            message: "Correctly updatedd!"
                        })
                    }
                })
            }
        });
    }

    //getting report
    getReport(req, res) {
        let customer_id = req.params.id;

        Claim.findOne({
            customer_id: ObjectId(customer_id)
        }, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
}

module.exports = ClaimController;