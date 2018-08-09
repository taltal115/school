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
const service_1 = require("../service");
//import { userRules } from './rules/user.rules';
const auth_1 = require("../utils/auth");
const documents_1 = require("../models/documents");
class UserRoute {
    static init(router) {
        const service = new service_1.UserService();
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
        router.get("/users/:id", auth_1.Authorized, (req, res) => {
            service.session = req.session;
            service.get(req.params.id).then((user) => {
                if (user) {
                    return res.status(200).json(user);
                }
                else {
                    return res.sendStatus(404);
                }
            }).catch((error) => {
                return res.status(500).json(error);
            });
        });
        router.put("/user", auth_1.Authorized, (req, res) => {
            service.session = req.session;
            service.add(req.body).then((user) => {
                var data = { "success": true, "user": user };
                res.status(200).json(data);
            }).catch((error) => {
                res.status(409).json(error);
            });
        });
        router.post("/user/:id", auth_1.Authorized, (req, res) => {
            service.session = req.session;
            service.update(req.params.id, req.body).then((user) => {
                var data = { "success": true, "user": user };
                res.status(200).json(data);
            }).catch((error) => {
                res.status(409).json(error);
            });
        });
        router.delete("/user/:id", auth_1.Authorized, (req, res) => {
            service.session = req.session;
            service.delete(req.params.id).then(() => {
                return res.status(200).json({ success: true });
            }).catch((error) => {
                return res.status(500).json(error);
            });
        });
    }
}
module.exports = UserRoute;
