const express = require('express');
const { 
  addToCollection, 
  getFromCollection, 
  addSchema, 
  getSchema,
  getForm,
  addForm
} = require('./src/api');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/status', (req, res) => {
  res.statusCode = 200;
  res.send({ message: 'working' });
});

app.post('/', addToCollection);
app.get('/', getFromCollection);
app.post('/schema', addSchema);
app.get('/schema', getSchema);
app.post('/form', addForm);
app.get('/form', getForm);


app.listen(port, () => console.log(`🚀 Server started at port: ${port}`))