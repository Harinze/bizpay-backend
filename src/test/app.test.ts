import request from 'supertest';
import app from '../app'; 
import chai from 'chai'; 
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;
describe('Login Endpoint', () => {
  beforeEach(() => {
    jest.setTimeout(10000); 
  });

  it('should return 200 with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'kibe474@gmail.com', phoneNumber:'07039270533', password: 'Password1$' });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('You have logged in...');
  });

  it('should return 401 with invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'kibe474@gmail.com', phoneNumber:'09034548345', password: 'invalidpassword' });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('User not found or invalid credentials.');
  });

  it('should return 401 with missing credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({});

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Email, phone number, and password are required.');
  });
});


