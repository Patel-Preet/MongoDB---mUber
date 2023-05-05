const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe("Tests Driver Controllers", () => {

    it('test creating a driver', (done) => {
        request(app)
            .post('/api/driver')
            .send({email: "abc@abc.com"})
            .end((error, response) => {
                assert(response.body.email === "abc@abc.com");
                done();
            });
    });

    it('tests updating the driver', (done) => {
        const driver = new Driver({email: "abc@abc.com"});
        driver.save()
            .then(() => {
                request(app)
                    .put(`/api/driver/${driver._id}`)
                    .send({active: true})
                    .end((error, response) => {
                        assert(response.body.active === true);
                        done();
                    });
            });
    });

    it('tests deleting the driver', (done) => {
        const driver = new Driver({email: 'abc@abc.com'});
        driver.save()
            .then(() => {
                request(app)
                    .del(`/api/driver/${driver._id}`)
                    .end((error, response) => {
                        assert(response.text === 'Driver successfully removed');
                        done();
                    });

            });
    });

});
