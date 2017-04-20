"use strict";

const mongoose = require('mongoose');

const RequestsSchema = mongoose.Schema({
    requestID: Number,
    uid: Number,
    requestDate: Date,
    status: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: Number
});

const PropertyRequest = mongoose.model('PropertyRequest', RequestsSchema);

module.exports = PropertyRequest;

