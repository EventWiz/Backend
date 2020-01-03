import request from 'supertest';
import app from '../../api/server';

let token;
let eventId;

const BASE_URL = '/api';
const userData = {
  email: 'test1@test.com',
  password: 'test12',
  firstName: 'john',
  lastName: 'doe',
};

const eventData = {
  type: 'Tech',
  img: 'https://img.jpg',
  title: 'Young shall grow',
  desc: 'A meetup where the young learn how to grow',
  location: 'Zone Tech park, Gbagada',
  start_date: '10/10/2020',
  end_date: '11/10/2020',
  capacity: 30,
};

const invalidToken = 'e2JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3V1aWQiOiJhOGQ4NWU3NS1mZjg0LTQ0NTctOGZhNy0xMzk0NWJkNjRmZWEiLCJpYXQiOjE1NzgwMDcxODgsImV4cCI6MTU3ODA5MzU4OH0.Me8o_7I_WMCp506aDHmyamGutbe3ZjhgVywi3210_-M';

beforeAll(async () => {
  try {
    await request(app)
      .post(`${BASE_URL}/auth/register`)
      .send(userData);
    const response = await request(app)
      .post(`${BASE_URL}/auth/login`)
      .send({ email: 'test1@test.com', password: 'test12' });

    token = response.body.token;
  } catch (error) {
    return null;
  }
});

describe('Create event Endpoint', () => {
  it('should fail if validation fails', async () => {
    const { statusCode, body } = await request(app)
      .post(`${BASE_URL}/events/create`)
      .send({});
    expect(statusCode).toEqual(422);
    expect(body).toHaveProperty('errors');
  });
  it('should respond with status code 201 if event creation succeeds', async () => {
    const { statusCode, body } = await request(app)
      .post(`${BASE_URL}/events/create`)
      .send(eventData)
      .set('Authorization', token);
    expect(statusCode).toEqual(201);
    expect(body).toHaveProperty('event');
    eventId = body.event.id;
  });
  it('should respond with status code 500 when invalid token is passed', async () => {
    const { statusCode } = await request(app)
      .post(`${BASE_URL}/events/create`)
      .send(eventData)
      .set('Authorization', invalidToken);
    expect(statusCode).toEqual(500);
  });
  it('should respond with status code 403 when no token is passed', async () => {
    const { statusCode } = await request(app)
      .post(`${BASE_URL}/events/create`)
      .send(eventData);
    expect(statusCode).toEqual(403);
  });
});

describe('Edit event Endpoint', () => {
  it('should respond with status code 400 if an empty request was sent', async () => {
    const { statusCode } = await request(app)
      .put(`${BASE_URL}/events/${eventId}`)
      .send({})
      .set('Authorization', token);
    expect(statusCode).toEqual(400);
  });
  it('should respond with status code 200', async () => {
    const { statusCode, body } = await request(app)
      .put(`${BASE_URL}/events/${eventId}`)
      .send({
        type: 'Social',
      })
      .set('Authorization', token);
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty('updatedEvent');
  });
  it('should respond with status code 404 when invalid eventId is passed', async () => {
    const { statusCode } = await request(app)
      .post(`${BASE_URL}/events/93875660985095`)
      .send(eventData)
      .set('Authorization', token);
    expect(statusCode).toEqual(404);
  });
});

describe('Delete event Endpoint', () => {
  it('should respond with status code 204', async () => {
    const { statusCode } = await request(app)
      .delete(`${BASE_URL}/events/${eventId}`)
      .set('Authorization', token);

    expect(statusCode).toEqual(204);
  });
  it('should respond with status code 404 when invalid eventId is passed', async () => {
    const { statusCode } = await request(app)
      .delete(`${BASE_URL}/events/cb4b1b16-3df2-4e37-985d-aed1b67a6b4c`)
      .set('Authorization', token);
    expect(statusCode).toEqual(404);
  });
});
