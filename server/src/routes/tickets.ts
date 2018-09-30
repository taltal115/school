import { NextFunction, Request, Response, Router } from "express";
import {Ticket} from '../models/documents/ticket-model'
import {Authorized} from "../utils/auth";

import {IMailOptions} from "../models/general";
import {EmailService} from "../service";

class TicketsRoute {
    public static init(router: Router) {

        router.post("/tickets", Authorized, async (req: Request, res: Response, next: NextFunction) => {
            const ticket = new Ticket(req.body);
            delete ticket.__v;
            // console.log("ticket: ", ticket);
            ticket.save((err: any) => {
                if (err) res.status(500).send({error: err});
                else {
                    const options: IMailOptions = {};
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
                    EmailService.send(options)
                        .then((info) => {
                            console.log(`Message Sent ${info.response}`);
                            res.status(201).send({status: "Created", ticket: ticket});
                            console.log('file saved to db!');
                        })
                        .catch((error) => {
                            return res.status(500).send({error: error});

                        });
                }
            });
        });

        router.get("/tickets", Authorized, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const u_id_query = req.session ? {teacherId: req.session.u_id} : null;
                console.log("u_id_query: ",u_id_query);
                const tickets = await Ticket.find(u_id_query);
                // const tickets = await Ticket.find({});
                console.log("ticketstickets: ",tickets.length);
                res.status(201).json(tickets);
            } catch (e) {
                res.status(500).send({error: e});
            }
        });

        router.delete("/tickets", async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const tickets = await Ticket.find({});
                const deleteAction = await Ticket.findByIdAndRemove(req.body._id);

                console.log("deleteAction: ",req.body);
                console.log("deleteActiondeleteAction: ",deleteAction);
                res.status(201).json('tickets');
            } catch (e) {
                res.status(500).send({error: e});
            }
        });
    }
}
export = TicketsRoute;