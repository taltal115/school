"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import { validationResult } from 'express-validator/check';
// import { UserService } from "../service";
// import { IUserInstance } from "../models";
//import { userRules } from './rules/user.rules';
// import { Authorized } from "../utils/auth";
const documents_1 = require("../models/documents");
const auth_1 = require("../utils/auth");
// import {IMailOptions} from "../models/general";
// import {EmailService} from "../service";
class OrganisationsRoute {
    static init(router) {
        // const service = new UserService();
        router.post("/organisations", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const organisation = new documents_1.Organization(req.body);
            delete organisation.__v;
            // console.log("ticket: ", ticket);
            organisation.save((err) => {
                if (err)
                    res.status(500).send({ error: err });
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
                    res.status(201).send({ status: "Created", organisation: organisation });
                    console.log('file saved to db!');
                    //     })
                    //     .catch((error) => {
                    //         return res.status(500).send({error: error});
                    //
                    //     });
                }
            });
        }));
        router.get("/organisations/:id", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const u_id_query = req.session ? {teacherId: req.session.u_id} : null;
                const organization = yield documents_1.Organization.findById(req.params.id);
                res.status(201).json(organization);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.get("/organisations", auth_1.Authorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // service.session = req.session;
            // service.retrieve().then((users: Array<IUserInstance>) => {
            //     return res.status(200).json(users);
            // }).catch((error: Error) => {
            //     return res.status(500).send(error);
            if ((req.session && req.session.role === 'teacher') || (req.session && req.session.role === 'student')) {
                return res.status(401).json('Unauthorized request!');
            }
            // });
            try {
                const org = yield documents_1.Organization.find({});
                return res.status(200).json(org);
            }
            catch (e) {
                return res.status(500).json(e);
            }
        }));
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
        router.delete("/organisations", auth_1.Authorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const tickets = await Ticket.find({});
                const deleteAction = yield documents_1.Organization.findByIdAndRemove(req.body._id);
                res.status(201).json(deleteAction);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
        router.patch("/organisations", auth_1.Authorized, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateOrganization = yield documents_1.Organization.findByIdAndUpdate(req.body._id, req.body);
                res.status(201).json(updateOrganization);
            }
            catch (e) {
                res.status(500).send({ error: e });
            }
        }));
    }
}
module.exports = OrganisationsRoute;
