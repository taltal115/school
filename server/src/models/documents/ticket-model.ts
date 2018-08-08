import {  Schema, model } from "mongoose";

export const TicketsSchema: Schema = new Schema({
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
},
  {
    timestamps: true,
    strict: false
  });

export const Ticket = model<any>("Ticket", TicketsSchema);
