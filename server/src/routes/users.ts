import {NextFunction, Request, Response, Router} from "express";
//import { validationResult } from 'express-validator/check';
// import { UserService } from "../service";
// import { IUserInstance } from "../models";
//import { userRules } from './rules/user.rules';
// import { Authorized } from "../utils/auth";
import { User } from "../models/documents";
import {Authorized} from "../utils/auth";

class UsersRoute {
    public static init(router: Router) {
        // const service = new UserService();

        router.get("/users", Authorized, async (req: Request, res: Response) => {
            let query: {} = {};
            if(
                (req.session && req.session.role === 'teacher') || (req.session && req.session.role === 'student')) {
                return res.status(401).json('Unauthorized request!');
            }
            if (req.session && req.session.role === 'admin') {
                query = {orgId: req.session.org_id}
            }
            if (req.session && req.session.role === 'super') {
                query = { }
            }
            // });
            try {
                const users = await User.find(query);
                return res.status(200).json(users);
            } catch (e) {
                return res.status(500).json(e);
            }
        });

        // router.get("/users/:id", Authorized, (req: Request, res: Response) => {
        //     service.session = req.session;
        //     service.get(req.params.id).then((user: IUserInstance) => {
        //         if (user) {
        //             return res.status(200).json(user);
        //         } else {
        //             return res.sendStatus(404);
        //         }
        //     }).catch((error: Error) => {
        //         return res.status(500).json(error);
        //     });
        // });
        //
        // router.put("/user", Authorized, (req: Request, res: Response) => {
        //     service.session = req.session;
        //     service.add(req.body).then((user: IUserInstance) => {
        //         var data = { "success": true, "user": user };
        //         res.status(200).json(data);
        //     }).catch((error: Error) => {
        //         res.status(409).json(error);
        //     });
        // });
        //
        // router.post("/user/:id", Authorized, (req: Request, res: Response) => {
        //     service.session = req.session;
        //     service.update(req.params.id, req.body).then((user: any) => {
        //         var data = { "success": true, "user": user };
        //         res.status(200).json(data);
        //     }).catch((error: Error) => {
        //         res.status(409).json(error);
        //     });
        // });
        //

        router.get("/users/:id", Authorized, async (req: Request, res: Response, next: NextFunction) => {
            try {
                // const u_id_query = req.session ? {teacherId: req.session.u_id} : null;
                const user = await User.findById(req.params.id);
                res.status(201).json(user);
            } catch (e) {
                res.status(500).send({error: e});
            }
        });

        router.delete("/users", Authorized, async (req: Request, res: Response) => {
            try {
                // const tickets = await Ticket.find({});
                const deleteAction = await User.findByIdAndRemove(req.body._id);
                res.status(201).json(deleteAction);
            } catch (e) {
                res.status(500).send({error: e});
            }
        });

        router.patch("/users" , Authorized, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const updateUser = await User.findByIdAndUpdate(req.body._id, req.body);
                res.status(201).json(updateUser);
            } catch (e) {
                res.status(500).send({error: e});
            }
        });
    }
}
export = UsersRoute;