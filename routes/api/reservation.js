const express = require('express');

const router = express.Router();

var dbConn=require('../../config/db');

//Insert
router.post('/add',(req,res)=>{
    console.log(req.body);

    var reservationReport =  req.body.reservationReport;
    var reservationConfirmation =  req.body.reservationConfirmation;
   


//perform MsSQL insert
sqlQuery=`INSERT INTO reservation(reservation_report, reservation_confirmation)VALUES("${reservationReport}","${reservationConfirmation}")`;

dbConn.query(sqlQuery,function(error,results,field){
    if(error) throw error;
    res.status(200).json(results);
    });

});


//Select
router.get('/view', (req,res) => {
    sqlQuery = `SELECT * FROM reservation`;

    dbConn.query(sqlQuery,function(error,results, fields){
        if (error) throw error;
         res.status(200).json(results);
    });
});


//Update 
router.patch('/update/:reservation_id',(req,res) => {
    console.log('API CONNECTION SUCCESS!');
    const id = req.params.reservation_id;
    dbConn.query(`SELECT reservation_id FROM reservation WHERE reservation_id = ${id}`, function(error,results,fields){

        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID")
            res.status(400).json("Unknown ID");
            return;
        }
        else{
            var reservationReport =  req.body.reservationReport;
            var reservationConfirmation =  req.body.reservationConfirmation;

            dbConn.query(`UPDATE reservation SET reservation_report = '${reservationReport}',reservation_confirmation = '${reservationConfirmation}' WHERE reservation_id = ${id}`, function(error,results,fields){
                console.log("Reservation Table Updated Successfuly");
                if (error) return;
                res.status(200).json(results);
            });
        }
    });
});


//Delete

router.delete('/delete/:reservation_id', (req,res) =>{
    console.log('API Connection Success!');
    const id = req.params.reservation_id;
    dbConn.query(`SELECT reservation_id FROM reservation WHERE reservation_id = ${id}`, function(error,results,fields){
        if (error) throw error;

        else if (!results.length) {
            console.log("Unknown ID");
            return;
        }
        else{
            dbConn.query(`DELETE FROM reservation WHERE reservation_id=${id}`, function(error,results,fields){
                console.log("Entry Deleted");
                if(error) return;
                res.status(200).json(results);
            });
        }
    });
});


///////////////////////////////////
module.exports=router;
