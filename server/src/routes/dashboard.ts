import { Request, Response, Router} from "express";
import {Organization, User} from "../models/documents";
import {Authorized} from "../utils/auth";
import {Ticket} from "../models/documents/ticket-model";

class DashboardRoute {
    public static init(router: Router) {
        // const service = new UserService();

        router.get("/dashboard/organisations", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role === 'super') {
                try {
                    const org = await Organization.count({});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else if(req.session && req.session.role === 'admin') {
                try {
                    const org = await Organization.count({_id: req.session.orgId});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else {
                return res.status(401).json('Unauthorized request!');
            }
        });

        router.get("/dashboard/users", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role === 'super') {
                try {
                    const org = await User.count({});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else if(req.session && req.session.role === 'admin') {
                try {
                    const org = await User.count({orgId: req.session.org_id});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else {
                return res.status(401).json('Unauthorized request!');
            }
        });

        router.get("/dashboard/tickets", Authorized, async (req: Request, res: Response) => {
            if(req.session && req.session.role === 'super' || req.session && req.session.role === 'technician') {
                try {
                    const org = await Ticket.count({});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else if(req.session && req.session.role === 'admin') {
                try {
                    const org = await Ticket.count({orgId: req.session.org_id});
                    return res.status(200).json(org);
                } catch (e) {
                    return res.status(500).json(e);
                }
            } else {
                return res.status(401).json('Unauthorized request!');
            }
        });
    }
}
export = DashboardRoute;