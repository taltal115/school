"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: [
            'regular-school',
            'yeshiva',
            'ulpana'
        ]
    }
}, {
    _id: true,
    strict: true,
    collection: 'organizations'
});
exports.Organization = mongoose_1.model("Organization", exports.OrganizationSchema);
