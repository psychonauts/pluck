require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const app = express();

app.use(express.static(`${__dirname}/../client/dist`)); //Need to change this file path
app.use(bodyParser.json());


app.get('/health', (req, res) => { // testing server functionality
  res.status(200).send('up');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
