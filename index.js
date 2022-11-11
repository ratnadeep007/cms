const express = require('express');
const { 
  addToCollection, 
  getFromCollection, 
  addInput, 
  getInput,
  getForm,
  addForm
} = require('./src/api');
const { initMongooseConnection, getMongooseDB, registerModels } = require('./src/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

initMongooseConnection();
registerModels();

const db = getMongooseDB();


app.get('/status', (req, res) => {
  res.statusCode = 200;
  res.send({ message: 'working' });
});

app.post('/', addToCollection);
app.get('/', getFromCollection);
app.post('/input', addInput);
app.get('/input', getInput);
app.post('/form', addForm);
app.get('/form', getForm);


app.listen(port, () => console.log(`🚀 Server started at port: ${port}`))