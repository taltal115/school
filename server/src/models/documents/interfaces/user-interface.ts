export interface IUser{
    email: String,
    password: String,
    fullName: String,
    phoneNumber: String,
    userRole: String,
    loginAttempts: Number,
    lockUntil: Number
}