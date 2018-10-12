"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ticket_model_1 = require("../models/documents/ticket-model");
const auth_1 = require("../utils/auth");
const service_1 = require("../service");
const export_service_1 = require("../service/export-service");
class TicketsRoute {
    static init(router) {
        const exportService = new export_service_1.ExportService();
        router.post("/tickets", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const ticket = new ticket_model_1.Ticket(req.body);
            ticket.orgId = req.session ? req.session.org_id : null;
            delete ticket.__v;
            ticket.save((err) => {
                if (err)
                    res.status(500).send({ error: err });
                else {
                    const options = {};
                    options.to = 'taltal115@gmail.com';
                    options.from = 'DiTve MAM <admin@school.com>';
                    options.template = 'new-ticket';
                    options.subject = 'School - Restore Password';
                    options.context = {
                        createdAt: "2018-09-22T07:47:59.870Z",
                        damagedDevice: "nullfdsa",
                        deviceLocation: "fdsnull",
                        id: 0,
                        missingEquipments: ["fdsafds"],
                        problemsNature: "fdsa",
                        serialNumber: "fdsanull",
                        status: "pending",
                        structure: "fdsanull",
                        teacherId: "5b9ad95a8a43f1cff3ba4909",
                        teacherName: "nulfdsl",
                        teachersContactPhone: "fdsds",
                        _id: "5ba5f3af9da6db53b56acf83"
                    };
                    service_1.EmailService.send(options)
                        .then((info) => {
                        console.log(`Message Sent ${info.response}`);
                        res.status(201).send({ status: "Created", ticket: ticket });
                        console.log('file saved to db!');
                    })
                        .catch((error) => {
                        return res.status(500).send({ error: error });
                    });
                }
            });
        }));
        router.get("/tickets", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let query = null;
                if ((req.session && req.session.role === 'super') ||
                    (req.session && req.session.role === 'technician')) {
                    query = {};
                }
                else if (req.session) {
                    query = { orgId: req.session.org_id };
                }
                const tickets = yield ticket_model_1.Ticket.find(query);
                res.status(201).json(tickets);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.get("/tickets/:id", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const u_id_query = req.session ? {teacherId: req.session.u_id} : null;
                const ticket = yield ticket_model_1.Ticket.findById(req.params.id);
                res.status(201).json(ticket);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.delete("/tickets", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const tickets = await Ticket.find({});
                const deleteAction = yield ticket_model_1.Ticket.findByIdAndRemove(req.body._id);
                res.status(201).json(deleteAction);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.post("/tickets/export/csv", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const csv = yield exportService.ConvertJsonToCsv(req.body);
                res.status(201).json(csv);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.patch("/tickets", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateTicket = yield ticket_model_1.Ticket.findByIdAndUpdate(req.body._id, req.body);
                res.status(201).json(updateTicket);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
    }
}
module.exports = TicketsRoute;
