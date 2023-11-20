const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const route = require('./routes/routes');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', route);
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
