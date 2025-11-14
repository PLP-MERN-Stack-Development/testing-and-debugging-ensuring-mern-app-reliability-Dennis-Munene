// backend/tests/integration/bugs.int.test.js

const request = require('supertest');
const app = require('../../src/server');
const BugModel = require('../../src/models/Bug');

describe('Bugs API', () => {
  beforeEach(() => {
    BugModel.__reset();
  });

  test('POST /api/bugs creates a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Bug A', reporter: 'Alice' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Bug A');
    expect(res.body.reporter).toBe('Alice');
    expect(res.body.status).toBe('open');
  });

  test('GET /api/bugs returns all bugs', async () => {
    await BugModel.create({ title: 'Bug B', reporter: 'Bob' });

    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Bug B');
  });

  test('PUT /api/bugs/:id updates bug status', async () => {
    const create = await request(app)
      .post('/api/bugs')
      .send({ title: 'Bug C', reporter: 'Charlie' });

    const id = create.body.id;

    const res = await request(app)
      .put(`/api/bugs/${id}`)
      .send({ status: 'resolved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  test('DELETE /api/bugs/:id deletes a bug', async () => {
    const create = await request(app)
      .post('/api/bugs')
      .send({ title: 'Bug D', reporter: 'David' });

    const id = create.body.id;

    const res = await request(app).delete(`/api/bugs/${id}`);

    expect(res.statusCode).toBe(204);

    const getRes = await request(app).get('/api/bugs');
    expect(getRes.body.find(b => b.id === id)).toBeUndefined();
  });
});
