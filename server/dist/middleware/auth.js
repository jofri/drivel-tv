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
/* eslint-disable no-underscore-dangle */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the token from the header, if there is no token, sends forbidden status
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.sendStatus(403);
    const [, token] = authHeader.split(' ');
    try {
        const jwtCheck = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY); // change this any type later!
        const user = yield User_model_1.UserModel.findOne({ _id: jwtCheck._id });
        // If user does not exist in the database
        if (!user)
            return res.sendStatus(401);
        req.user = user;
        next();
        return null;
        // if user is not verified
    }
    catch (error) {
        res.sendStatus(403);
        return null;
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map