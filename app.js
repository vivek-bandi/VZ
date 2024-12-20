const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);