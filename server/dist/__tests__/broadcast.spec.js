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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const mocks_1 = __importDefault(require("./mocks"));
const server_1 = __importDefault(require("../server"));
describe('Broadcast endpoints', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('should successfully grab all broadcasts', () => __awaiter(void 0, void 0, void 0, function* () {
        const postBroadcast = yield supertest_1.default(server_1.default)
            .post('/api/create-broadcast')
            .set('Content-Type', 'application/json')
            .send(mocks_1.default.mockUser1)
            .expect(200);
        const allBroadcasts = yield supertest_1.default(server_1.default)
            .get('/api/get-all-broadcasts')
            .expect(200);
    }), 30000);
    // it ('should return 404 if broadcasts is null', async() => {
    //   const allBroadcasts = await request(expressServer)
    //     .get('/api/get-all-broadcasts')
    //     .expect(404)
    // })
    // it('should successfuly grab a single broadcast', async () => {
    //   const oneBroadcast = await request(expressServer)
    //     .get('/api/get-broadcast')
    //   expect(oneBroadcast.status).toBe(200);
    // });
});
//# sourceMappingURL=broadcast.spec.js.map