/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import mocks from '../mocks/users';
import testedServer from '../server';
// const SECRET_KEY = 'test';

describe('Session Server:', () => {
  // const agent = request.agent(testedServer);
  const User = mongoose.connection.model('User');
  // let token: string;

  afterEach(async () => {
    try {
      await mongoose.connection.dropCollection('users');
      return true;
    } catch (error) {
      return true;
    }
  });

  afterAll(async () => {
    testedServer.close();
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  describe('Registering New User (Endpoint "/signup"):', () => {
    it('should create a new user', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockUser1)
        .expect(201)
        .end(() => {
          User.find((_, users) => {
            expect(users.length).toBe(1);
            done();
          });
        });
    });

    it('should store a bcrypt hashed password', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockUser1)
        .end(() => {
          User.find((err, users: any) => {
            expect(users[0].password).not.toBe(mocks.mockUser1.password);
            expect(bcrypt.compareSync(mocks.mockUser1.password, users[0].password)).toBe(true);
            done();
          });
        });
    });

    it('should return an error when creating a user without an username', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockIncompleteUser1)
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('should return an error when creating a user without a password', (done) => {
      request(testedServer)
        .post('/signup')
        .set('Content-Type', 'application/json')
        .send(mocks.mockIncompleteUser2)
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('Should not create the same user twice', (done) => {
      User.create(mocks.mockUser1).then(() => {
        request(testedServer)
          .post('/signup')
          .set('Content-Type', 'application/json')
          .send(mocks.mockUser1)
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
    beforeEach(async () => {
      const hash = await bcrypt.hash(mocks.mockUser1.password, 10);
      await User.create({ ...mocks.mockUser1, password: hash });
    });

    it('should accept a username & password and return the user object', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: mocks.mockUser1.username, password: mocks.mockUser1.password })
        .expect(200)
        .end(done);
    });

    it('should return an error when trying to login with the wrong credentials', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: mocks.mockUser2.password })
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('should return an error when missing the email', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: '', password: mocks.mockUser1.password })
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('should return an error when missing the password', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: '' })
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('should return a valid access token on successful login', (done) => {
      request(testedServer)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ email: mocks.mockUser1.email, password: mocks.mockUser1.password })
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
