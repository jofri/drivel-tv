"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express router
const express_1 = require("express");
const broadcast_controller_1 = __importDefault(require("./controllers/broadcast-controller"));
const user_controller_1 = require("./controllers/user-controller");
const auth_1 = __importDefault(require("./middleware/auth"));
const router = express_1.Router();
// Route to get all broadcasts
router.get('/api/get-all-broadcasts', broadcast_controller_1.default.getAllBroadcast);
// Route to get broadcast page (by client POSTing id to identify broadcast)
router.post('/api/get-broadcast', broadcast_controller_1.default.getBroadcast);
// Route to create a new broadcast
router.post('/api/create-broadcast', broadcast_controller_1.default.createBroadcast);
// Route to delete a broadcast
router.delete('/api/delete-broadcast', broadcast_controller_1.default.deleteBroadcast);
// Login and Signup
router.post('/signup', user_controller_1.registerUser);
router.post('/login', user_controller_1.userLogIn);
router.get('/me', auth_1.default, user_controller_1.getUserInfo);
exports.default = router;
//# sourceMappingURL=router.js.map