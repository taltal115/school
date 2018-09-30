import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { ISession } from "../models/";
//IUserAttributes,

const config = require("./config.js");
const errors = require("./errors.js");

function verify(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
        var header = request.headers && request.headers['authorization'];
        var token = header && header.replace(/^Bearer (\S+)$/, "$1");
        console.log("header: ",request.headers)
        if (!token) {
            reject('No authorization token was found');
        }
        else {
            jwt.verify(token, config.jwtSecret, function (err, decoded) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("decoded: ",decoded)
                    resolve(decoded);
                }
            });
        }
    });
}

export function Authorized(request: Request, res: Response, next: NextFunction) {
    verify(request).then((token => {
        console.log('Authorized: ',token);
        request.session = token;
        //console.log('Authorized: ', token, request)
        next();
    })).catch((err) => {
        res.status(401).json({ message: "Invalid credentials", view: 'auth', errors: errors.fromJwtError(err) });
    });
}

// export function SignToken(user: any, orgId: string, role: number): ISession {
export function SignToken(user: any): ISession {
    const duration = config.session.duration;
    const expires = new Date(Date.now() + duration * 1000);
    const token = jwt.sign({
        u_id: user._id,
        role: user.userRole
    }, config.jwtSecret, { expiresIn: duration });

    // user.setDataValue('role', role);
    const resObj =  {
        user: user,
        token: token,
        expires: expires
    };
    return resObj;
}

// export function VerifyToken(request: Request): Promise<ISession> {
//     const defer = deferred();
//     verify(request).then((token => {
//         models.User.findOne({
//             where: {
//                 id: token.u_id
//             },
//             attributes: ['id', 'email', 'first_name', 'last_name', 'picture']
//         }).then(function (user) {
//             if (!user) {
//                 defer.reject(errors.types.authTokenInvalid());
//             }
//
//             var duration = config.session.duration;
//             var expires = new Date(Date.now() + duration * 1000);
//
//             defer.resolve({
//                 user: user,
//                 token: token,
//                 expires: expires
//             });
//
//         }).catch(function (err) {
//             defer.reject(err);
//         });
//     })).catch((err) => {
//         defer.reject(err);
//     });
//     return defer.promise;
// }
