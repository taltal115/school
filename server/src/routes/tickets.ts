import { NextFunction, Request, Response, Router } from "express";
// import { Authorized } from "../utils/auth";
import {Ticket} from '../models/documents/ticket-model'

class TicketsRoute {
    public static init(router: Router) {

        router.post("/tickets", async (req: Request, res: Response, next: NextFunction) => {
            console.log("tal" ,req.body);

            const ticket = new Ticket(req.body);
            delete ticket.__v;
            // console.log("ticket: ", ticket);
            ticket.save((err: any) => {
                if (err) res.status(500).send({error: err});
                else {
                    res.status(201).send({status: "Created", ticket: ticket});
                    console.log('file saved to db!');
                }
            });
        });

        router.get("/tickets", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tickets = await Ticket.find({});
                // console.log("ticketstickets: ",tickets);
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