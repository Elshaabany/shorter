import app from './app.js';
import dotenv from 'dotenv';
import process from 'node:process';
import mongoose from 'mongoose';

dotenv.config();

(async () => {
	await mongoose.connect(process.env.MongodbURI);
	app.listen(process.env.port || 5000, () => {
		console.log('server is runnig');
	});
})();
