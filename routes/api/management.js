const express=require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

var dbConn = require('../../config/db');

router.post('/add',(req,res)=>{
    console.log(req.body);

    var managementName = req.body.managementName;
    var managementEmail = req.body.managementEmail;
    var managementNumber = req.body.managementNumber;

    sqlQuery = `INSERT INTO management (management_name, management_email, management_number) VALUES("${managementName}","${managementEmail}","${managementNumber}")`;

    dbConn.query(sqlQuery, function(error, results, fields){
        if(error) throw error;
        res.status(200).json(results)
    });
       
});

//SELECT
router.get('/view', (req, res) => {

     //authentication
  const token = req.headers.authorization.split(' ')[1]
  if(!token){
      res.status(200).json({
          success: false,
          msg: "Error, token not found",
      });
  }


  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(decodedToken);
    

      //start select
  sqlQuery = `SELECT * FROM management`;

  dbConn.query(sqlQuery, function(error, results, fields){
    if(error) throw error;
    res.status(200).json(results)
});

});

//UPDATE
router.patch('/update/:management_id', (req, res) => {
  console.log('API RUNNING!!');
  const id = req.params.id;
  dbConn.query(`SELECT management_id FROM management WHERE management_id = ${id}`, function(error, results, fields){
    if(error) throw error;

    else if (!results.length){
      console.log("management_id does not exist!")
      res.status(300).json("management_id does not exist!");
      return;
    }
    else{
      var managementName = req.body.managementName;
      var managementEmail = req.body.managementEmail;
      var managementNumber = req.body.managementNumber;

      dbConn.query(`UPDATE management set management_name = "${managementName}", transaction_email = "${managementEmail}", management_number = "${managementNumber}" WHERE management_id = ${id}`, function(error,results,fields){
        console.log("data updated!");
        if(error) return;
        res.status(300).json(results);
      });      
    }
  });
});

//DELETE
router.delete('/delete/:management_id',(req, res) => {
  console.log('API RUNNING!!');
  const id = req.params.management_id;
  dbConn.query(`SELECT management_id FROM management WHERE management_id = ${id}`, function(error, results, fields){
    if(error) throw error;

    else if (!results.length){
      console.log("id does not exist!")
      res.status(300).json("id does not exist!");
      return;
    }
    else{
      dbConn.query(`DELETE from management WHERE management_id = ${id}`, function(error, results, fields){
        console.log("data deleted!");
        if(error) return;
        res.status(300).json(results);
      });
    }
  });
});

module.exports = router;