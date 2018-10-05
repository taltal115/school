import { Request, Response, Router} from "express";
import {Organization, User} from "../models/documents";
import {Authorized} from "../utils/auth";
import {Ticket} from "../models/documents/ticket-model";

class DashboardRoute {
    public static init(router: Router) {
        // const service = new UserService();

        router.get("/dashboard/organisations", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role !== 'super') {
                return res.status(401).json('Unauthorized request!');
            }
            try {
                const org = await Organization.count({});
                return res.status(200).json(org);
            } catch (e) {
                return res.status(500).json(e);
            }
        });

        router.get("/dashboard/users", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role !== 'super') {
                return res.status(401).json('Unauthorized request!');
            }
            try {
                const org = await User.count({});
                return res.status(200).json(org);
            } catch (e) {
                return res.status(500).json(e);
            }
        });

        router.get("/dashboard/tickets", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role !== 'super') {
                return res.status(401).json('Unauthorized request!');
            }
            try {
                const org = await Ticket.count({});
                return res.status(200).json(org);
            } catch (e) {
                return res.status(500).json(e);
            }
        });
    }
}
export = DashboardRoute;