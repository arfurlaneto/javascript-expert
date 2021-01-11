const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async() => {
        const response = await request(app)
          .get('/contact')
          .expect(200);
        assert.deepStrictEqual(response.text, 'contact us page');
    })
  });

  describe('/contact', () => {
    it('should request an inexistent route /hi and redirect to hello', async() => {
        const response = await request(app)
          .get('/hi')
          .expect(200);
        assert.deepStrictEqual(response.text, 'Hello World!')
    })
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP status 200', async() => {
        const response = await request(app)
          .post('/login')
          .send({ username: 'afurlaneto', password: '123456' })
          .expect(200);

        assert.deepStrictEqual(response.text, 'Logging has succeded!');
    })

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP status 401', async() => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'afurlaneto', password: 'wrongPassword' })
        .expect(401);

      assert.deepStrictEqual(response.text, 'Logging failed!');
  })
  });
});
