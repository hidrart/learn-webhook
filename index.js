import express from 'express';
import bodyparser from 'body-parser';
import fs from 'fs';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('This is Online!');
});

// testing webhooks from webhook.site
app.get('/hook', (req, res) => {
	res.send('This is a webhook!');
});

app.post('/hook', (req, res) => {
	fs.writeFile('webhook.json', JSON.stringify(req.body), (err) => {
		if (err) {
			console.log(err);
		}
	});
	res.status(200).send('This is a webhook!');
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
