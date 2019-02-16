import mongoose from 'mongoose';
import env from './env';

mongoose.Promise = global.Promise;

const { db: { uri } } = env;

mongoose.set('useCreateIndex', true);
mongoose.connect(uri, { useNewUrlParser: true });

const database = mongoose.connection;

export default database;
