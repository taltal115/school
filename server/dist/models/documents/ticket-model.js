"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TicketsSchema = new mongoose_1.Schema({
    date: {
        type: Date,
    },
    teacherName: {
        type: String,
    },
    damagedDevice: {
        type: String,
    },
    serialNumber: {
        type: String,
    },
    structure: {
        type: String,
    },
    deviceLocation: {
        type: String
    },
    problemsNature: {
        type: String,
    },
    missingEquipments: {
        type: [String],
    },
    teachersContactPhone: {
        type: String
    },
    status: {
        type: String,
        enum: ['done', 'pending', 'waiting_for_approval'],
    }
}, {
    timestamps: true,
    strict: false
});
exports.Ticket = mongoose_1.model("Ticket", exports.TicketsSchema);
