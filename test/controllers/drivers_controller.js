const assert = require('assert');
const request = require('supertest');
const mongoose = require("mongoose");
const app = require('../../app');

const Driver = mongoose.model("driver");

describe("The drivers controller", () => {

    it("Gets drivers in a location when a GET request to 'api/driver' is initiated", (done) => {
        const seattleDriver = new Driver({
            email: "seattle@seattle.com",
            geometry: { type: "Point", coordinates: [-122.45677, 47.65876] }
        });

        const miamiDriver = new Driver({
            email: "miami@miami.com",
            geometry: { type: "Point", coordinates: [-80.54667, 25.3455] }
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, response) => {
                        assert(response.body.length === 1);
                        assert(response.body[0].email === "miami@miami.com");
                        done();
                    })
            })
    });

    it("Creates a new driver record when a POST request to 'api/driver' is initiated", (done) => {
        Driver.count()
            .then((count) => {
                request(app)
                    .post('/api/drivers')
                    .send({ email: "test@test.com" })
                    .end(() => {
                        Driver.count()
                            .then((newCount) => {
                                assert(newCount === count + 1);
                                done();
                            })
                    })
            })

    });

    it("updates driver record when a PUT request is made to 'api/drivers'", (done) => {
        const driverz = new Driver({
            email: "t@t.com",
            driving: false
        });

        driverz.save().then(() => {
            request(app)
                .put(`/api/drivers/${driverz._id}`)
                .send({ driving: true })
                .end(() => {
                    Driver.findOne({ email: "t@t.com" })
                        .then((drv) => {
                            assert(drv.driving === true);
                            done();
                        })
                })
        })

    });

    it("removes driver record when a delete request is made to 'api/drivers'", (done) => {
        const driver = new Driver({
            email: "test@test.com"
        });

        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({ email: "test@test.com" })
                        .then((drv) => {
                            assert(drv === null);
                            done();
                        })
                })
        })

    })

})