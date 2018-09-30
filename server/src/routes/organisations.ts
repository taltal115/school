import {NextFunction, Request, Response, Router} from "express";
//import { validationResult } from 'express-validator/check';
// import { UserService } from "../service";
// import { IUserInstance } from "../models";
//import { userRules } from './rules/user.rules';
// import { Authorized } from "../utils/auth";
import { Organization } from "../models/documents";
import {Authorized} from "../utils/auth";
// import {IMailOptions} from "../models/general";
// import {EmailService} from "../service";

class OrganisationsRoute {
    public static init(router: Router) {
        // const service = new UserService();

        router.post("/organisations", Authorized, async (req: Request, res: Response, next: NextFunction) => {
            const organisation = new Organization(req.body);
            console.log("req.organisation: ",req.body)
            delete organisation.__v;
            // console.log("ticket: ", ticket);
            organisation.save((err: any) => {
                if (err) res.status(500).send({error: err});
                else {
                    // const options: IMailOptions = {};
                    // options.to = 'taltal115@gmail.com';
                    // options.from = 'DiTve MAM <admin@school.com>';
                    // options.template = 'new-ticket';
                    // options.subject = 'School - Restore Password';
                    // options.context = {
                    //     createdAt: "2018-09-22T07:47:59.870Z",
                    //     damagedDevice: "nullfdsa",
                    //     deviceLocation: "fdsnull",
                    //     id: 0,
                    //     missingEquipments: ["fdsafds"],
                    //     problemsNature: "fdsa",
                    //     serialNumber: "fdsanull",
                    //     status: "pending",
                    //     structure: "fdsanull",
                    //     teacherId: "5b9ad95a8a43f1cff3ba4909",
                    //     teacherName: "nulfdsl",
                    //     teachersContactPhone: "fdsds",
                    //     _id: "5ba5f3af9da6db53b56acf83"
                    // };
                    // EmailService.send(options)
                    //     .then((info) => {
                    //         console.log(`Message Sent ${info.response}`);
                            res.status(201).send({status: "Created", organisation: organisation});
                            console.log('file saved to db!');
                    //     })
                    //     .catch((error) => {
                    //         return res.status(500).send({error: error});
                    //
                    //     });
                }
            });
        });

        router.get("/organisations", Authorized, async (req: Request, res: Response) => {
            // service.session = req.session;
            // service.retrieve().then((users: Array<IUserInstance>) => {
            //     return res.status(200).json(users);
            // }).catch((error: Error) => {
            //     return res.status(500).send(error);
            if(
                (req.session && req.session.role === 'teacher') || (req.session && req.session.role === 'student')) {
                return res.status(401).json('Unauthorized request!');
            }
            // });
            try {
                const org = await Organization.find({});
                console.log("org: ",org);
                console.log("Authorized: ",req.session);
                return res.status(200).json(org);
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
        // router.delete("/user/:id", Authorized, (req: Request, res: Response) => {
        //     service.session = req.session;
        //     service.delete(req.params.id).then(() => {
        //         return res.status(200).json({ success: true });
        //     }).catch((error: Error) => {
        //         return res.status(500).json(error);
        //     });
        // });
    }
}
export = OrganisationsRoute;