const express=require('express');

const router = express.Router();

var dbConn = require('../../config/db');

router.post('/add',(req,res)=>{
    console.log(req.body);

    var transactionMethod = req.body.transactionMethod;
    var transactionConfirmation = req.body.transactionConfirmation;
    var transactionName = req.body.transactionName;

    sqlQuery = `INSERT INTO transaction (transaction_method, transaction_confirmation, transaction_name) VALUES("${transactionMethod}","${transactionConfirmation}","${transactionName}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error) throw error;
        res.status(200).json(results)
    });
       
});

//SELECT
router.get('/view', (req, res) => {
  sqlQuery = `SELECT * FROM transaction`;

  dbConn.query(sqlQuery, function(error, results, fields){
    if(error) throw error;
    res.status(200).json(results)
});

});

//UPDATE
router.patch('/update/:transaction_id', (req, res) => {
  console.log('API RUNNING!!');
  const id = req.params.transaction_id;
  dbConn.query(`SELECT transaction_id FROM transaction WHERE transaction_id = ${id}`, function(error, results, fields){
    if(error) throw error;

    else if (!results.length){
      console.log("transaction_id does not exist!")
      res.status(300).json("transaction_id does not exist!");
      return;
    }
    else{
      var transactionMethod = req.body.transactionMethod;
      var transactionConfirmation = req.body.transactionConfirmation;
      var transactionName = req.body.transactionName;

      dbConn.query(`UPDATE transaction set transaction_method = "${transactionMethod}", transaction_confirmation = "${transactionConfirmation}", transaction_name = "${transactionName}" WHERE transaction_id = ${id}`, function(error,results,fields){
        console.log("data updated!");
        if(error) return;
        res.status(300).json(results);
      });      
    }
  });
});

//DELETE
router.delete('/delete/:transaction_id',(req, res) => {
  console.log('API RUNNING!!');
  const id = req.params.transaction_id;
  dbConn.query(`SELECT transaction_id FROM transaction WHERE transaction_id = ${id}`, function(error, results, fields){
    if(error) throw error;

    else if (!results.length){
      console.log("id does not exist!")
      res.status(300).json("id does not exist!");
      return;
    }
    else{
      dbConn.query(`DELETE from transaction WHERE transaction_id = ${id}`, function(error, results, fields){
        console.log("data deleted!");
        if(error) return;
        res.status(300).json(results);
      });
    }
  });
});

module.exports = router;