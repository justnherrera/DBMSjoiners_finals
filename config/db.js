var mysql=require('mysql');
var connection=mysql.createConnection({
hots:'localhost',
user:'root',
password:'',
database:'joiners_travel_booking_system'

});

connection.connect(function(error){
    if (!!error){
        console.log(error);    
    } else {
        console.log("MySQL database connected successfully");
    }
});

module.exports=connection;