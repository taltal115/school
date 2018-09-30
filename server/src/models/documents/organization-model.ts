import { Schema, Document, Model, model } from "mongoose";
import { IOrganization } from './interfaces';

export interface IOrganizationModel extends IOrganization, Document { }


export const OrganizationSchema = new Schema({
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
        strict: false,
        collection: 'organizations'
    });

export const Organization: Model<IOrganizationModel> = model<IOrganizationModel>("Organization", OrganizationSchema);