const mongoose = require('mongoose');


before((done) => {
    mongoose.connect('mongodb://localhost/voyager_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn(`Error connecting to test database ${err}`)
        })

});

beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;

    drivers.drop()
        .then(() => drivers.createIndexes({ 'geometry.coordinates': '2dsphere' }))
        .then(() => done())
        .catch(() => done());
})