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
class UserRoute {
    static init(router) {
        // const service = new UserService();
        router.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
            // service.session = req.session;
            // service.retrieve().then((users: Array<IUserInstance>) => {
            //     return res.status(200).json(users);
            // }).catch((error: Error) => {
            //     return res.status(500).send(error);
            // });
            try {
                const users = yield documents_1.User.find({});
                console.log("users: ", users);
                return res.status(200).json(users);
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
module.exports = UserRoute;
