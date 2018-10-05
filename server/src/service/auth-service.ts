// import * as bcrypt from 'bcrypt';
import { User } from "../models/documents";
import { IUser } from "../models/documents/interfaces";
import { UserSchema } from "../models/documents/user-model";

const deferred = require('deferred');
//const auth = require("../utils/auth").default;

export class AuthService {
    async register(userObject: IUser, session: any) {
        if(!userObject.orgId) {
            userObject.orgId = session.org_id;
            console.log('userObject123_org_id: ',userObject);
        }
        const userToSave = new User(userObject);
        console.log('userObject123: ',userObject);
        // save user to database
        return userToSave.save()
    }

    async login(email: string, password: string){
        try {
            return new Promise(async (res, rej) => {
                const user = await User.findOne({ email: email })
                console.log("user ",user);
                if (user) {
                    // attempt to authenticate user
                    UserSchema.methods.comparePassword(password, user.password, function(err, isMached) {
                        if (err) throw err;
                        if (isMached) {
                            // handle login success
                            console.log('login success');
                            return res(user);
                        } else {
                            console.log('bad login');
                            return rej('bad login');
                        }
                    });
                } else {
                    rej('Error Login!')
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
}