"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TicketsSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
    },
    teacherName: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
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
        required: true
    },
    missingEquipments: {
        type: [String],
    },
    teachersContactPhone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['done', 'pending', 'waiting_for_approval'],
        default: 'waiting_for_approval'
    },
    ticketCharge: {
        type: Number,
        default: 0
    },
    technicianResolution: {
        type: String
    }
}, {
    timestamps: true,
    strict: true
});
exports.Ticket = mongoose_1.model("Ticket", exports.TicketsSchema);
