const router = require('express').Router();
const stripe = require('stripe')("sk_test_8YHNthQmaXUmjycOspw4DbyS00bCr5ChMS");
const { v4: uuidv4 } = require('uuid');
router.post('/stripepayment', (req, res, next) => {
    const { products, token } = req.body;
    let amount = 0;
    products.map(p => {
        amount += p.price;
    })
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then(customer => {
        stripe.charges.create({
            amount: amount,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: "A test account",
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, { idempotencyKey }).then(result => {
            res.status(200).json(result);
        }).catch(e => console.log(e))
    }).catch((err) => {
        console.log(err);
    });

});

module.exports = router;