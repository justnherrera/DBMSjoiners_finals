const express = require('express');

const router = express.Router();

var dbConn=require('../../config/db');

//Insert
router.post('/add',(req,res)=>{
    console.log(req.body);

    var packagesSchedule =  req.body.packagesSchedule;
    var packagesPrice =  req.body.packagesPrice;
    var packagesBundle =  req.body.packagesBundle;
   


//perform MsSQL insert
sqlQuery=`INSERT INTO packages(packages_schedule, packages_price, packages_bundle)VALUES("${packagesSchedule}","${packagesPrice}","${packagesBundle}")`;

dbConn.query(sqlQuery,function(error,results,field){
    if(error) throw error;
    res.status(200).json(results);
    });

});


//Select
router.get('/view', (req,res) => {
    sqlQuery = `SELECT * FROM packages`;

    dbConn.query(sqlQuery,function(error,results, fields){
        if (error) throw error;
         res.status(200).json(results);
    });
});


//Update 
router.patch('/update/:packages_id',(req,res) => {
    console.log('API CONNECTION SUCCESS!');
    const id = req.params.packages_id;
    dbConn.query(`SELECT packages_id FROM packages WHERE packages_id = ${id}`, function(error,results,fields){

        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var packagesSchedule =  req.body.packagesSchedule;
            var packagesPrice =  req.body.packagesPrice;
            var packagesBundle =  req.body.packagesBundle;

            dbConn.query(`UPDATE packages SET packages_schedule = '${packagesSchedule}',packages_price = ${packagesPrice},packages_bundle = '${packagesBundle}' WHERE packages_id = ${id}`, function(error,results,fields){
                console.log("Packages Table Updated Successfuly");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});


//Delete

router.delete('/delete/:packages_id', (req,res) =>{
    console.log('API Connection Success!');
    const id = req.params.packages_id;
    dbConn.query(`SELECT packages_id FROM packages WHERE packages_id = ${id}`, function(error,results,fields){
        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID");
            return;
        }
        else{
            dbConn.query(`DELETE FROM packages WHERE packages_id = ${id}`, function(error,results,fields){
                console.log("Entry Deleted");
                if(error) return;
                res.status(200).json(results);
            });
        }
    });
});


///////////////////////////////////
module.exports=router;
