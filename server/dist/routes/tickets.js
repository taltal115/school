"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { Authorized } from "../utils/auth";
const ticket_model_1 = require("../models/documents/ticket-model");
const auth_1 = require("../utils/auth");
class TicketsRoute {
    static init(router) {
        router.post("/tickets", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("tal", req.body);
            const ticket = new ticket_model_1.Ticket(req.body);
            delete ticket.__v;
            // console.log("ticket: ", ticket);
            ticket.save((err) => {
                if (err)
                    res.status(500).send({ error: err });
                else {
                    res.status(201).send({ status: "Created", ticket: ticket });
                    console.log('file saved to db!');
                }
            });
        }));
        router.get("/tickets", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield ticket_model_1.Ticket.find({});
                // console.log("ticketstickets: ",tickets);
                res.status(201).json(tickets);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.delete("/tickets", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const tickets = await Ticket.find({});
                const deleteAction = yield ticket_model_1.Ticket.findByIdAndRemove(req.body._id);
                console.log("deleteAction: ", req.body);
                console.log("deleteActiondeleteAction: ", deleteAction);
                res.status(201).json('tickets');
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
    }
}
module.exports = TicketsRoute;
