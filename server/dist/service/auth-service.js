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
const service_1 = require("../service");
const documents_1 = require("../models/documents");
const user_model_1 = require("../models/documents/user-model");
const deferred = require('deferred');
//const auth = require("../utils/auth").default;
class AuthService {
    register(userObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToSave = new documents_1.User(userObject);
            // save user to database
            userToSave.save(function (err) {
                if (err)
                    throw err;
                // fetch user and test password verification
                documents_1.User.findOne({ email: userObject.email }, function (err, user) {
                    if (err)
                        throw err;
                    // test a matching password
                    user.comparePassword(userObject.password, function (err, isMatch) {
                        if (err)
                            throw err;
                        console.log('Password123:', isMatch); // -> Password123: true
                    });
                    // // test a failing password
                    // user.comparePassword('123Password', function(err, isMatch) {
                    //     if (err) throw err;
                    //     console.log('123Password:', isMatch); // -> 123Password: false
                    // });
                });
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // attempt to authenticate user
                return user_model_1.UserSchema.statics.getAuthenticated(email, password, function (err, user, reason) {
                    if (err)
                        throw err;
                    // login was successful if we have a user
                    if (user) {
                        // handle login success
                        console.log('login success');
                        return;
                    }
                    // otherwise we can determine why we failed
                    var reasons = user_model_1.UserSchema.statics.failedLogin;
                    switch (reason) {
                        case reasons.NOT_FOUND:
                        case reasons.PASSWORD_INCORRECT:
                            // note: these cases are usually treated the same - don't tell
                            // the user *why* the login failed, only that it did
                            return 'notLoggedIn';
                        // break;
                        case reasons.MAX_ATTEMPTS:
                            // send email or otherwise notify user that account is
                            // temporarily locked
                            return 'blocked';
                        // break;
                    }
                });
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
    getUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield service_1.UserService.find(query);
        });
    }
}
exports.AuthService = AuthService;
