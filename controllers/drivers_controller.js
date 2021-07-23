const Driver = require('../models/driver');
module.exports = {
    greeting(req, res) {
        res.status(200).send({ greeting: "Welcome to Voyager" });
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        Driver.aggregate([{
            $geoNear: {
                near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                spherical: true, maxDistance: 200000, distanceField: "dist.calculated"
            }
        }]).then(function (drivers) { res.send(drivers); })
            .catch(next);

    },

    //Logic to create new driver's record
    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then((driver) => {
                res.send(driver);
            })
            .catch(next)
    },

    edit(req, res, next) {
        const driverProps = req.body;
        const driverId = req.params.id;

        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then((driver) => {
                res.send(driver);
            })
            .catch(next)
    },
    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove({ _id: driverId })
            .then((driver) => {
                res.send(driver);
            })
            .catch(next)
    }

}