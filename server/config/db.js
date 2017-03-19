import mongoose from 'mongoose';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/shorturl');
  mongoose.connection
    .once('open', () => console.log('MONGODB connected'))
    .on('error', err => console.error(err));
};
