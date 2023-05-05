const Driver = require('../models/Driver');

exports.createDriver = (req, res, next) => {
    const driver = new Driver(req.body);   
    driver.save()
        .then((driver)=>{
            res.status(200);
            res.send(driver);
        })
        .catch(() => next);
}

//localhost:3000/api/driver?lat=100&lng=101
exports.readDriver = (req, res, next) => {
    const { lng, lat } = req.query;
    Driver.find({
        location: {
            $geoWithin: {
                $center: [[parseFloat(lng), parseFloat(lat)], 50 ]
            },
            // $limit: 0
        }
    })
    .then(drivers => res.send(drivers))
    .catch(next);
}

exports.updateDriver = (req, res, next) => {
    const driverId = req.params.id;
    const toUpdate = req.body;

    Driver.updateOne({_id: driverId}, toUpdate)
        .then(() => Driver.findById({ _id: driverId }))
        .then((driver) => {
            res.status(200);
            res.send(driver);
        })
        .catch(() => next);
}

exports.deleteDriver = (req, res, next) => {
    const driverId = req.params.id;
    Driver.deleteOne({_id: driverId})
    .then(() => {
        res.status(200);
        res.send("Driver successfully removed");
    })
    .catch(() => next);
}