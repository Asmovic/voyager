const DriversController = require('../controllers/drivers_controller')
module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    //Route to create new driver record
    app.post('/api/drivers', DriversController.create);

    //Route to Edit driver record
    app.put('/api/drivers/:id', DriversController.edit);

    //Route to Delete driver record
    app.delete('/api/drivers/:id', DriversController.delete);

    //Route to retrieve driver record
    app.get('/api/drivers', DriversController.index);

}