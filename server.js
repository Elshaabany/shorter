import app from './app.js';
import process from 'node:process';

app.listen(process.env.port || 5000, () => {
	console.log('server is runnig');
});
