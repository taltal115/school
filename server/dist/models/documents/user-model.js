"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10, 
// these values can be whatever you want - we're defaulting to a
// max of 5 attempts, resulting in a 2 hour lock
MAX_LOGIN_ATTEMPTS = 5, LOCK_TIME = 2 * 60 * 60 * 1000;
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        unique: true,
        index: true
    },
    phoneNumber: {
        type: String
    },
    userRole: {
        type: String,
        enum: [
            'super',
            'admin',
            'teacher',
            'student'
        ]
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
}, {
    //_id: false,
    strict: false,
    collection: 'users'
});
exports.UserSchema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});
exports.UserSchema.pre('save', function (next) {
    var user = this;
    console.log("preuser: ", user);
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
exports.UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
exports.UserSchema.methods.incLoginAttempts = function (cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates['$set'] = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};
// expose enum on the model, and provide an internal convenience reference
var reasons = exports.UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};
exports.UserSchema.statics.getAuthenticated = function (email, password, cb) {
    return exports.User.findOne({ email: email }, function (err, user) {
        if (err)
            return cb(err);
        console.log('11111111111111111111111111');
        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }
        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function (err) {
                if (err)
                    return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }
        // test for a matching password
        return user.comparePassword(password, function (err, isMatch) {
            if (err)
                return cb(err);
            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil)
                    return cb(null, user);
                // reset attempts and lock info
                var updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function (err) {
                    if (err)
                        return cb(err);
                    return cb(null, user);
                });
            }
            // password is incorrect, so increment login attempts before responding
            return user.incLoginAttempts(function (err) {
                if (err)
                    return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });
    });
};
exports.User = mongoose_1.model("User", exports.UserSchema);
