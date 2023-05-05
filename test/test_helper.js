const mongoose = require('mongoose');

//We are opening the connection here because it will only connect once the test is been called
//Also mocha, mongoose, and express dont work great hand in hand
before((done) => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once( 'open', () => done())
        .on('error', (error) => console.warn('Warning', error));
});

beforeEach(done => {
    //Dont know why but have you put drivers instead of driver
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
       //Indexes are recreated automatically now after dropping DB.
      .then(() => done())
      .catch(() => done());
  });