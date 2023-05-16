import app from './app.js';
import mongoose from 'mongoose';
import { MongodbURI, host, port } from './util/config.js';

(async () => {
	await mongoose.connect(MongodbURI);
	app.listen(port || 5000, () => {
		console.log(`server is runnig on http://${host}:${port}`);
	});
})();
