const express = require('express');
const moongoose = require('mongoose');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

moongoose.connect(process.env.MONGO_DB_URL, {
    dbName: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Database connected')
})
.catch(error => console.log(error.message));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on PORT ' + process.env.PORT);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


// All HTTP 
app.all('/', (req, res) => {
    console.log(req.body)
    res.send("Home directory");
});








const ProductRoute = require('./Routes/Product.route')
app.use('/products', ProductRoute);

const SaleRoute = require('./Routes/Sale.route')
app.use('/sales', SaleRoute);










// Error handler
app.use((req, res, next) => {
//    const err = new Error ("Not Found")
//    err.status = 404;
//    next(err)
    next(createError(404, "Not Found"));
})


app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: err.status || 500,
        message: err.message
    })
})






