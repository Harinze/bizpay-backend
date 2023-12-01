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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
describe('Login Endpoint', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
    it('should return 200 with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ email: 'kibe474@gmail.com', phoneNumber: '07039270533', password: 'Password1$' });
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('You have logged in...');
    }));
    it('should return 401 with invalid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ email: 'kibe474@gmail.com', phoneNumber: '09034548345', password: 'invalidpassword' });
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('User not found or invalid credentials.');
    }));
    it('should return 401 with missing credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({});
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Email, phone number, and password are required.');
    }));
});
