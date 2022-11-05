const express = require('express');
require('dotenv').config();

const custRoutes=require('./routes/api/customer');
const regRoutes=require('./routes/api/registration');
const pkgRoutes=require('./routes/api/packages');
const resRoutes=require('./routes/api/reservation');
const tranRoutes=require('./routes/api/transaction');
const mngRoutes=require('./routes/api/management');
const authRoutes=require('./routes/api/auth');

const app = express();


app.use(express.json({extended:false}));
app.use('/api/customer',custRoutes);
app.use('/api/registration',regRoutes);
app.use('/api/packages',pkgRoutes);
app.use('/api/reservation',resRoutes);
app.use('/api/transaction',tranRoutes);
app.use('/api/management',mngRoutes);
app.use('/api/auth',authRoutes);

app.get('/',(req,res)=>res.send('API Runnnng!!!'))

const PORT=6000;

app.listen(PORT,()=>console.log(`Server started on PORT ${PORT}`) );