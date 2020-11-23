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
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const Message_model_1 = __importDefault(require("../models/Message-model"));
const mocks_1 = __importDefault(require("../mocks/mocks"));
let socket;
describe.only('socket.io testing', () => {
    beforeAll((done) => {
        socket = socket_io_client_1.default('http://localhost:4000', { transports: ['websocket'] });
        socket.emit('join', mocks_1.default.mockRoom);
        done();
    });
    it('Client should create message when the message is emitted', (done) => __awaiter(void 0, void 0, void 0, function* () {
        socket.emit('chat message to server', mocks_1.default.mockMessage);
        const msg = Message_model_1.default.find({ msg: mocks_1.default.mockMessage.msg });
        console.log(msg);
        expect(msg).toBeTruthy;
        done();
    }));
});
//# sourceMappingURL=socket.spec.js.map