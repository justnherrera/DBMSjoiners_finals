const express = require('express');

const router = express.Router();

var dbConn=require('../../config/db');

//Insert
router.post('/add',(req,res)=>{
    console.log(req.body);

    var registrationDate =  req.body.registrationDate;
    var registrationLocation =  req.body.registrationLocation;
   


//perform MsSQL insert
sqlQuery=`INSERT INTO registration(registration_date, registration_location)VALUES("${registrationDate}","${registrationLocation}")`;

dbConn.query(sqlQuery,function(error,results,field){
    if(error) throw error;
    res.status(200).json(results);
    });

});


//Select
router.get('/view', (req,res) => {
    sqlQuery = `SELECT * FROM registration`;

    dbConn.query(sqlQuery,function(error,results, fields){
        if (error) throw error;
         res.status(200).json(results);
    });
});


//Update 
router.patch('/update/:registration_id',(req,res) => {
    console.log('API CONNECTION SUCCESS!');
    const id = req.params.registration_id;
    dbConn.query(`SELECT registration_id FROM registration WHERE registration_id = ${id}`, function(error,results,fields){

        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var registrationDate =  req.body.registrationDate;
            var registrationLocation =  req.body.registrationLocation;

            dbConn.query(`UPDATE registration SET registration_date = '${registrationDate}',registration_location = '${registrationLocation}' WHERE registration_id = ${id}`, function(error,results,fields){
                console.log("Registration Table Updated Successfuly");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});


//Delete

router.delete('/delete/:registration_id', (req,res) =>{
    console.log('API Connection Success!');
    const id = req.params.registration_id;
    dbConn.query(`SELECT registration_id FROM registration WHERE registration_id = ${id}`, function(error,results,fields){
        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID");
            return;
        }
        else{
            dbConn.query(`DELETE FROM registration WHERE registration_id=${id}`, function(error,results,fields){
                console.log("Entry Deleted");
                if(error) return;
                res.status(200).json(results);
            });
        }
    });
});


///////////////////////////////////
module.exports=router;
