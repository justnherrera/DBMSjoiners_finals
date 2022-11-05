const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

var dbConn=require('../../config/db');

//Insert
router.post('/add',(req,res)=>{
    console.log(req.body);

    var customerNumber =  req.body.customerNumber;
    var customerName =  req.body.customerName;
    var customerBirth =  req.body.customerBirth;
    var customerAddress =  req.body.customerAddress;
    var customerEmail =  req.body.customerEmail;


//perform MsSQL insert
sqlQuery=`INSERT INTO customer(customer_number, customer_name, customer_birth, customer_address, customer_email)VALUES("${customerNumber}","${customerName}","${customerBirth}", "${customerAddress}", "${customerEmail}")`;

dbConn.query(sqlQuery,function(error,results,field){
    if(error) throw error;
    res.status(200).json(results);
    });

});


//Select
router.get('/view', (req,res) => {

    
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(200).json({
            success: false,
            msg: "Error, token not found",
        });
    }


    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);

    sqlQuery = `SELECT * FROM customer`;

    dbConn.query(sqlQuery,function(error,results, fields){
        if (error) throw error;
         res.status(200).json(results);
    });
});


//Update 
router.patch('/update/:customer_id',(req,res) => {
    console.log('API CONNECTION SUCCESS!');
    const id = req.params.customer_id;
    dbConn.query(`SELECT customer_id FROM customer WHERE customer_id= ${id}`, function(error,results,fields){

        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var customerNumber =  req.body.customerNumber;
            var customerName =  req.body.customerName;
            var customerBirth =  req.body.customerBirth;
            var customerAddress =  req.body.customerAddress;
            var customerEmail =  req.body.customerEmail;

            dbConn.query(`UPDATE customer SET customer_number = '${customerNumber}',customer_name = '${customerName}',customer_birth = '${customerBirth}',customer_address = '${customerAddress}',customer_email = '${customerEmail}' WHERE customer_id = ${id}`, function(error,results,fields){
                console.log("Updated Successfuly");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});


//Delete

router.delete('/delete/:customer_id', (req,res) =>{
    console.log('API Connection Success!');
    const id = req.params.customer_id;
    dbConn.query(`SELECT customer_id FROM customer WHERE customer_id = ${id}`, function(error,results,fields){
        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID");
            return;
        }
        else{
            dbConn.query(`DELETE FROM customer WHERE customer_id=${id}`, function(error,results,fields){
                console.log("Entry Deleted");
                if(error) return;
                res.status(200).json(results);
            });
        }
    });
});


///////////////////////////////////
module.exports=router;
