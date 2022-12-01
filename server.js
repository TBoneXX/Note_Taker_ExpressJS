const express = require('express');
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;



//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//STATIC Middleware
app.use(express.static('public'));

//API Route
app.use('/api', apiRoutes);

//HTML Route
app.use('/', htmlRoutes);



app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`)
});