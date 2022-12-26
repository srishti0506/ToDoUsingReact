
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors=require('cors');
const app = express();


// const conn=require('./db');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'todo'

});
app.get('/tasks',(req,res)=>{
    console.log("task");
    let sqlQuery = "SELECT * FROM items";
  
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
})
app.post('/addTask',(req,res)=>{
    let sqlQuery = "INSERT INTO items SET ?";
  
    let query = conn.query(sqlQuery, req.body,(err, results) => {
      if(err) 
      throw err;
      res.send(apiResponse(results));
    });
   
})
app.put('/edithead',(req,res)=>{
    console.log(req.body);
    let sqlQuery = "UPDATE items SET task='"+req.body.task+"' WHERE id= '"+req.body.id+"'";
  
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
})
app.put('/editTask',(req,res)=>{
  console.log(req.body);
  let sqlQuery = "UPDATE items SET task='"+req.body.task+"',completed='"+req.body.completed+"', status='"+req.body.status+"' WHERE id= '"+req.body.id+"'";

  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
})
app.delete('/deleteTask/:id',(req,res)=>{
    //res.send("Deleted the task");
    let sqlQuery = "DELETE FROM items WHERE id='"+req.params.id+"'";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
})
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
app.listen(4000,() =>{
    console.log('Server started on port 4000...');
  });
