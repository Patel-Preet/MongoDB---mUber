const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe("App test", ()=> {
    it('tests the index page', (done) => {
        request(app)
            .get('/')
            .end((err, response) => {
                assert(response.res.statusCode === 200);
                done();
            });
    });
});