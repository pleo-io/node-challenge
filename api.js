const clients = require('./connection');
const app = require('./server')
clients.connect();

app.get('/expenses',(req,res)=>{
    //============SORTING===========
    var sort = (function(err){
        if(err)
            throw err;
        con.query("SELECT * from expenses by amount_in_cents",function(err,result,fields){
            if(err)throw err;
            console.log(result)
        })
    })
    //=============FILTERING===============
    var filter = (function(db_error) {
        if (db_error) throw db_error;
        console.log("Connected!");
        var sql = "select * from expenses where amount_in_cents >='6000' and status='pending'";
        DB_Conn.query(sql, function (db_error, result) {
          if (db_error) throw db_error;
          console.log(result);
        });
        
      });
      //============PAGINATION===================
      var numRows;
      var queryPagination;
      var numPerPage = parseInt(req.query.npp, 10) || 1;
      var page = parseInt(req.query.page, 10) || 0;
      var numPages;
      var skip = page * numPerPage;
      // Here we compute the LIMIT parameter 
      var limit = skip + ',' + numPerPage;
      queryAsync('SELECT count(*) as numRows FROM expenses')
      .then(function(results) {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        console.log('number of pages:', numPages);

    clients.query((err,result)=>{
        if(!err){
            res.send(result.rows)
        }
    })
    clients.end;
})
app.get('/expenses/:id',(req,res)=>{
    clients.query(`Select * from users where id=${req.params.id}`)
        if(!err){
            res.send(result.rows);
        }
        clients.end;
    })
    app.post('/expenses',(req,res)=>{
        const user = req.body;
        let insertQuery = `Insert into expenses(id,merchant_name,amount_in_cents,currency,user_id,date_created,status)
        values${expenses.id},${expenses.merchant_name},${expenses.amount_in_cents},${expenses.currency},${expenses.user_id},${expenses.date_created},${expenses.status}`
    clients.query(insertQuery,(err,result)=>{
        if(!err){
            res.send(`Insertion is Sucessful!!!`)
        }
        else{
            console.log(err.message)
        }
    })
    clients.end;
    })
    app.put('/expenses/:id',(req,res)=>{
        let user = req.body;
        let UpdateQuery = `update expenses
                            set merchant_name ='${expenses.merchant_name}',
                            amount_in_cents='${amount_in_cents},
                           currency = '${expenses.currency}',
                            user_id = '${expenses.user_id}',
                            date_created ='${expenses.date_created}',
                            status = '${expenses.status}',
                            where id = '${expences.id}'`
        clients.query(UpdateQuery, (err,result)=>{
            if(!err){
                res.send('Update was sucessful!!!')
            }else{
                console.log(err.message)
            }
        })
        clients.end;                            
    })
    app.delete('./expenses/:id',(req,res)=>{
        let deleteQuery = `delete form expenses where id=${req.params.id}`
        clients.query(deleteQuery, (err,result)=>{
            if(!err){
                res.send('Deletion was Sucessful!!!')
            }else{
                console.log(err.message)
            }
        })
        clients.end;
    })
})
module.exports = app;