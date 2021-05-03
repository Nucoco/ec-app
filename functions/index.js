const functions = require("firebase-functions");
const stripe = require('stripe')(functions.config().stripe.key);
const cors = require('cors')

const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        Headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(body)
    })
}

/**
 * req {object} => {email: string, userId: string, paymentMethod: string}
 */

exports.stripeCustomer = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true})

    //Wrap your process with CORS. This way is a commonly used way to create an API.
    corsHandler(req, res, () => {
        //whether the method type is POST
        if(req.method !== 'POST'){
            sendResponse(res, 405, {error: "Invalid Request method!!"})
        }

        return stripe.customers.create({
            description: "EC App demo user",
            email: req.body.email,
            metadata: {userId: req.body.userId},
            payment_method: req.body.paymentMethod
        }).then((customer) => {
            sendResponse(res, 200, customer)
        }).catch((err) => {
            sendResponse(res, 500, {error: err})
        })
    })
})