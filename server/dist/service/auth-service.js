"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as bcrypt from 'bcrypt';
const documents_1 = require("../models/documents");
const user_model_1 = require("../models/documents/user-model");
const deferred = require('deferred');
//const auth = require("../utils/auth").default;
class AuthService {
    register(userObject, session) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userObject.orgId) {
                userObject.orgId = session.org_id;
                console.log('userObject123_org_id: ', userObject);
            }
            const userToSave = new documents_1.User(userObject);
            console.log('userObject123: ', userObject);
            // save user to database
            return userToSave.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield documents_1.User.findOne({ email: email });
                    console.log("user ", user);
                    if (user) {
                        // attempt to authenticate user
                        user_model_1.UserSchema.methods.comparePassword(password, user.password, function (err, isMached) {
                            if (err)
                                throw err;
                            if (isMached) {
                                // handle login success
                                console.log('login success');
                                return res(user);
                            }
                            else {
                                console.log('bad login');
                                return rej('bad login');
                            }
                        });
                    }
                    else {
                        rej('Error Login!');
                    }
                }));
            }
            catch (e) {
                return e;
            }
        });
    }
    role(user_id, org_id) {
        const defer = deferred();
        // models.UserOrganization.findOne({
        //     where: {
        //         user_id: user_id, org_id: org_id
        //     },
        //     attributes: ['role']
        // }).then((role) => {
        //     defer.resolve(role);
        // });
        return defer.promise;
    }
}
exports.AuthService = AuthService;
