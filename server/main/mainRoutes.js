"use strict";

const PropertyRequest = require('./mainModels'),
    express = require('express'),
    router = express.Router();

const requestsUrl = '/requests';

/* get all user requests */
router.get(requestsUrl + '/:uid', function (req, res, next) {
    let uid = req.params.uid;

    PropertyRequest
        .find({uid: uid})
        .exec(collectRequests);

    function collectRequests(err, allRequests) {
        if (err) {
            return console.error(err);
        } else {
            res.json(allRequests);
        }
    }
});

/* create new requests */
router.post(requestsUrl, function (req, res, next) {
    let body = req.body;

    let uid = body.uid;
    let props = body.props;

    props.map(function (property) {
        let newRequest = new PropertyRequest({
            requestID: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
            uid: uid,
            requestDate: new Date().getTime(),
            status: "Pending",
            streetAddress: property.streetAddress,
            city: property.city,
            state: property.state,
            zip: property.zip
        });

        newRequest.save(function (err, newRequest) {
            if (err) {
                return console.error(err);
            } else {
                console.log('Successfully created requests:', newRequest);
            }
        });
    });

    res.json({status: 'ok', message: 'Checkout succeeded!'});
});

module.exports = router;
