import {  Schema, model } from "mongoose";

export const TicketsSchema: Schema = new Schema({
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
},
  {
    timestamps: true,
    strict: true
  });

export const Ticket = model<any>("Ticket", TicketsSchema);
