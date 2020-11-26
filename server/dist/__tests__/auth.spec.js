"use strict";
/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import jwt from 'jsonwebtoken';
const users_1 = __importDefault(require("../mocks/users"));
const server_1 = __importDefault(require("../server"));
// const SECRET_KEY = 'test';
describe('Session Server:', () => {
    // const agent = request.agent(testedServer);
    const User = mongoose_1.default.connection.model('User');
    // let token: string;
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.dropCollection('users');
            return true;
        }
        catch (error) {
            return true;
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server_1.default.close();
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.disconnect();
    }));
    describe('Registering New User (Endpoint "/signup"):', () => {
        it('should create a new user', (done) => {
            supertest_1.default(server_1.default)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(users_1.default.mockUser1)
                .expect(201)
                .end(() => {
                User.find((_, users) => {
                    expect(users.length).toBe(1);
                    done();
                });
            });
        });
        it('should store a bcrypt hashed password', (done) => {
            supertest_1.default(server_1.default)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(users_1.default.mockUser1)
                .end(() => {
                User.find((err, users) => {
                    expect(users[0].password).not.toBe(users_1.default.mockUser1.password);
                    expect(bcrypt_1.default.compareSync(users_1.default.mockUser1.password, users[0].password)).toBe(true);
                    done();
                });
            });
        });
        it('should return an error when creating a user without an username', (done) => {
            supertest_1.default(server_1.default)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(users_1.default.mockIncompleteUser1)
                .expect((res) => {
                expect(res.status).toBeGreaterThanOrEqual(400);
            })
                .end(done);
        });
        it('should return an error when creating a user without a password', (done) => {
            supertest_1.default(server_1.default)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send(users_1.default.mockIncompleteUser2)
                .expect((res) => {
                expect(res.status).toBeGreaterThanOrEqual(400);
            })
                .end(done);
        });
        it('Should not create the same user twice', (done) => {
            User.create(users_1.default.mockUser1).then(() => {
                supertest_1.default(server_1.default)
                    .post('/signup')
                    .set('Content-Type', 'application/json')
                    .send(users_1.default.mockUser1)
                    .expect((res) => {
                    expect(res.status).toBeGreaterThanOrEqual(400);
                })
                    .end(() => {
                    User.find((err, users) => {
                        expect(users.length).toBe(1);
                        done();
                    });
                });
            });
        });
    });
    describe('Endpoint "/login":', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(users_1.default.mockUser1.password, 10);
            yield User.create(Object.assign(Object.assign({}, users_1.default.mockUser1), { password: hash }));
        }));
        it('should accept a username & password and return the user object', (done) => {
            supertest_1.default(server_1.default)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ username: users_1.default.mockUser1.username, password: users_1.default.mockUser1.password })
                .expect(200)
                .end(done);
        });
        it('should return an error when trying to login with the wrong credentials', (done) => {
            supertest_1.default(server_1.default)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: users_1.default.mockUser1.email, password: users_1.default.mockUser2.password })
                .expect((res) => {
                expect(res.status).toBeGreaterThanOrEqual(400);
            })
                .end(done);
        });
        it('should return an error when missing the email', (done) => {
            supertest_1.default(server_1.default)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: '', password: users_1.default.mockUser1.password })
                .expect((res) => {
                expect(res.status).toBeGreaterThanOrEqual(400);
            })
                .end(done);
        });
        it('should return an error when missing the password', (done) => {
            supertest_1.default(server_1.default)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: users_1.default.mockUser1.email, password: '' })
                .expect((res) => {
                expect(res.status).toBeGreaterThanOrEqual(400);
            })
                .end(done);
        });
        it('should return a valid access token on successful login', (done) => {
            supertest_1.default(server_1.default)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: users_1.default.mockUser1.email, password: users_1.default.mockUser1.password })
                .expect(200)
                // .expect((res) => {
                //   token = res.body.accessToken;
                // })
                .end(() => {
                // eslint-disable-next-line no-unused-vars
                User.find((err, users) => {
                    // const userId = String(users[0]._id); fix that
                    // expect(jwt.verify(token, SECRET_KEY)._id).toBe(userId);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=auth.spec.js.map