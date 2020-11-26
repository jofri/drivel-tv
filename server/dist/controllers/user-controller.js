"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.userLogIn = exports.registerUser = void 0;
/* eslint-disable no-underscore-dangle */
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Throws an error if missing password or username in the request body
        if (!req.body.password || !req.body.username || !req.body.email) {
            throw new Error();
        }
        // Throws an error if user already exists
        const userExists = yield User_model_1.UserModel.findOne({ username: req.body.username });
        if (userExists) {
            throw new Error();
        }
        // Hashes and stores user with hashed password
        bcrypt_1.default.hash(req.body.password, 10, (err, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.json({
                    error: err,
                });
            }
            const user = new User_model_1.UserModel({
                username: req.body.username,
                password: hashedPass,
                email: req.body.email,
            });
            yield User_model_1.UserModel.create(user);
            console.log(`Added to database: ${JSON.stringify(user)}`);
            res.send(user); // Sends the user data back as a response - Should I remove that?
        }));
    }
    catch (err) {
        res.sendStatus(403);
    }
});
exports.registerUser = registerUser;
const userLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // sets user email and password to be the req body equivalent, as it makes it more readable
    const { username, password } = req.body;
    try {
        // gets the username from the database
        const fetchedUser = yield User_model_1.UserModel.findOne({ username });
        // if the user does not exist in the database
        if (!fetchedUser)
            throw new Error();
        // gets the hashed password and uses bcrypt compare method to see if password matches
        const userHashedPassword = fetchedUser.password;
        const isValid = yield bcrypt_1.default.compare(password, userHashedPassword);
        // if passwords does not match:
        if (!isValid)
            throw new Error();
        // Else, if everything is correct, it will:
        // 1. Send the user data (without the password), to the client
        // 2. Send the token to the client so it can be stored and reused
        return res.status(200).json({
            user: {
                id: fetchedUser._id,
                username: fetchedUser.username,
                email: fetchedUser.email,
            },
            token: jsonwebtoken_1.default.sign({ _id: fetchedUser._id }, process.env.SECRET_KEY, {
                expiresIn: 86400,
            }),
        });
        // All the errors are going to be set as 403
        // as I do not want to know the user to know what caused the error
    }
    catch (err) {
        console.error(err);
        return res.status(403).send({
            error: 'Forbidden',
        });
    }
});
exports.userLogIn = userLogIn;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This is really straightforward, gets username, name and _id and sends it to the frontend.
    // Does not send sensitive information like password, resetpasswordlink
    try {
        const data = req.user;
        res.status(200);
        res.send({
            username: data.username,
            email: data.email,
            _id: data._id,
        });
    }
    catch (err) {
        res.sendStatus(403);
    }
});
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=user-controller.js.map