"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const check_1 = require("express-validator/check");
const service_1 = require("../service");
const auth_1 = require("../utils/auth");
// import * as opn from "opn";
class AuthRoute {
    static init(router) {
        const service = new service_1.AuthService();
        // router.get("/auth/:action", async (req: Request, res: Response, next: NextFunction) => {
        //     let user: IUserInstance;
        //     let action: string = req.params && req.params.action;
        //
        //     switch (action) {
        //         case "activate":
        //         case "restore":
        //             var token = req.query['token'];
        //             user = await service.getUser({ security_stamp: token });
        //             if (user != null) {
        //                 user.emailConfirmed = true;
        //                 user.save();
        //                 return res.status(301).redirect('/#' + action + '/' + user.securityStamp);
        //             }
        //             return res.status(301).redirect('/#error/403001');
        //
        //         case "get-user":
        //             var token = req.query['token'];
        //             user = await service.getUser({ security_stamp: token });
        //             if (user != null) {
        //                 return res.status(200).json({ "success": true, user: user });
        //             }
        //             break;
        //
        //         case "session":
        //             await VerifyToken(req).then(function (session) {
        //                 return res.status(200).json({ success: true, view: 'main', session: session });
        //             }).catch(function (err) {
        //                 return res.status(403).json({ success: false, view: 'auth', session: null, error: err });
        //             });
        //             break;
        //
        //         case "logout":
        //             await VerifyToken(req).then(function (session) {
        //                 return res.status(200).json({ success: true, view: 'auth', session: null });
        //             }).catch(function (err) {
        //                 return res.status(403).json({ success: false, view: 'auth', session: null, error: err });
        //             });
        //             break;
        //         default:
        //             res.status(500).redirect('/#unknown');
        //             break;
        //     }
        // });
        router.post("/auth/reset-password", (req, res) => {
            const errors = check_1.validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array());
            }
            // let token: string = req.body && req.body.reset_token;
            // let password: string = req.body && req.body.password;
            // UserService.resetPassword(token, password).then((user) => {
            //     res.status(200).json({ "success": true, user: user });
            // });
        });
        router.post("/auth/restore-password", (req, res) => {
            // let email: string = req.body && req.body.email;
            // UserService.restorePassword(email).then((user) => {
            //     res.status(200).json({ "success": true, user: user });
            // }).catch((error) => {
            //     res.status(403).json({ success: false, session: null, error: error });
            // });
        });
        router.get('/auth/ping', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json('pong!');
        }));
        router.post('/auth/register', auth_1.Authorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            // if (req.body.email === 'test@test.com') {
            try {
                console.log("Authorized111: ", req);
                const user = yield service.register(req.body, req.session);
                console.log('user._id: ', user._id);
                const session = auth_1.SignToken(user);
                res.status(200).json({ success: true, data: user, session: session });
            }
            catch (e) {
                res.status(403).json({ success: false, error: e });
            }
        }));
        router.post('/auth/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const user = yield service.login(body.email, body.password);
                if (user && user.email) {
                    console.log('user: ', user);
                    const session = auth_1.SignToken(user);
                    res.status(200).json({ success: true, data: user, session: session });
                }
                else {
                    res.status(401).json({ success: false, error: 'invalid username or password', session: null });
                }
            }
            catch (e) {
                res.status(403).json({ success: false, error: e, session: null });
            }
        }));
        router.get('/auth/status', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!(req.headers && req.headers.authorization)) {
                return res.status(400).json({
                    status: 'error'
                });
            }
            // simulate token decoding
            const header = req.headers.authorization.split(' ');
            const token = header[1];
            if (token === '1234567') {
                res.status(200).json({
                    status: 'success',
                });
            }
            else {
                res.status(401).json({
                    status: 'error'
                });
            }
        }));
        // service.login(body.email, body.password)
        //     .then((user) => {
        //         if (body.orgnization) {
        //             service.role(user.id, body.orgnization).then((role) => {
        //                 var _role: number = role.getDataValue('role')
        //                 var session = SignToken((user as IUserAttributes), body.orgnization, _role);
        //                 res.json({ "success": true, view: 'main', session: session });
        //             });
        //         }
        //         else {
        //             if (user.organizations && user.organizations.length > 1) {
        //                 var session = SignToken((user as IUserAttributes), '', -1);
        //                 res.json({ "success": true, view: 'auth', organizations: user.organizations, session: session });
        //             }
        //             else {
        //                 var organization = user.organizations[0];
        //                 // in a case user didn't attached to organization yet
        //                 if (organization === undefined) {
        //                     var session = SignToken((user as IUserAttributes), '', -1);
        //                     res.json({ "success": true, view: 'auth', session: session });
        //                 }
        //                 else {
        //                     service.role(user.id, organization.id).then((role) => {
        //                         var _role: number = role.getDataValue('role')
        //                         var session = SignToken((user as IUserAttributes), organization.id, _role);
        //                         res.json({ "success": true, view: 'main', session: session });
        //                     });
        //                 }
        //             }
        //         }
        //     })
        //     .catch((error) => {
        //         res.status(403).json({ success: false, view: 'auth', session: null, error: error });
        //     });
        // });
    }
}
module.exports = AuthRoute;
