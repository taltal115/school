// import * as bcrypt from 'bcrypt';
// import { models } from "./../models/entities/index";
import { IUserInstance } from "../models";
import { UserService } from "../service";
import { User } from "../models/documents";
import { IUser } from "../models/documents/interfaces";
import { UserSchema } from "../models/documents/user-model";

const deferred = require('deferred');
//const auth = require("../utils/auth").default;

export class AuthService {
    async register(userObject: IUser) {
        const userToSave = new User(userObject);
        // save user to database
        userToSave.save(function(err) {
            if (err) throw err;

            // fetch user and test password verification
            User.findOne({ email: userObject.email }, function(err: any, user: any) {
                if (err) throw err;

                // test a matching password
                user.comparePassword(userObject.password, function(err, isMatch) {
                    if (err) throw err;
                    console.log('Password123:', isMatch); // -> Password123: true
                });

                // // test a failing password
                // user.comparePassword('123Password', function(err, isMatch) {
                //     if (err) throw err;
                //     console.log('123Password:', isMatch); // -> 123Password: false
                // });
            });
        });
    }

    async login(email: string, password: string){
        try {
            // attempt to authenticate user
            return UserSchema.statics.getAuthenticated(email, password, function(err, user, reason) {
                if (err) throw err;

                // login was successful if we have a user
                if (user) {
                    // handle login success
                    console.log('login success');
                    return ;
                }

                // otherwise we can determine why we failed
                var reasons = UserSchema.statics.failedLogin;
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
        } catch (e) {
            return e;
        }
    }

    role(user_id: string, org_id: string): Promise<any> {
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

    async getUser(query: any): Promise<IUserInstance> {
        return await UserService.find(query);
    }
}