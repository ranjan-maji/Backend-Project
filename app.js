const express =  require('express')
const bodyParser =require('body-parser')
const mysql =require('mysql')
const req = require('express/lib/request')
const res = require('express/lib/response')
const Connection = require('mysql/lib/Connection')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

// My SQL

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs_db'

})

//Get all beers
app.get('',(req,res) => {

    pool.getConnection((err, Connection) => {
        if(err) throw err
        console.log('connected ad id ${connection.threadId}')

        Connection.query('SELECT * from beers',(err, rows) =>{
            Connection.release() //return the connection to pool
            if(!err) {
                res.send(rows)
            }else{
                console.log(err)
            }
        })




    })
})

//Get a beer by ID
app.get('/:id',(req,res) => {

    pool.getConnection((err, Connection) => {
        if(err) throw err
        console.log('connected ad id ${connection.threadId}')

        Connection.query('SELECT * from beers WHERE id =?',[req.params.id],(err, rows) =>{
            Connection.release() //return the connection to pool
            if(!err) {
                res.send(rows)
            }else{
                console.log(err)
            }
        })




    })
})

//Delete a records /beers
app.delete('/:id',(req,res) => {

    pool.getConnection((err, Connection) => {
        if(err) throw err
        console.log('connected ad id ${connection.threadId}')

        Connection.query('DELETE from beers WHERE id =?',[req.params.id],(err, rows) =>{
            Connection.release() //return the connection to pool
            if(!err) {
                res.send('Beer with the Record ID: ${[req.params.id]} has been removed')
            }else{
                console.log(err)
            }
        })




    })
})


//Add a record /beer
app.post('',(req,res) => {

    pool.getConnection((err, Connection) => {
        if(err) throw err
        console.log('connected ad id ${connection.threadId}')

        const params = req.body
        Connection.query('INSERT INTO beers SET ?', params ,(err, rows) => {
            Connection.release() //return the connection to pool
            if(!err) {
                res.send('Beer with the Record ID: ${params.id} has been added.')
            }else{
                console.log(err)
            }
        })


        console.log(req.body)

    })
})

//update a record /beer
app.put('',(req,res) => {

    pool.getConnection((err, Connection) => {
        if(err) throw err
        console.log('connected ad id ${connection.threadId}')

        
        const { id, name, tagline, description, image } = req.body
        Connection.query('UPDATE beers SET name = ?, tagline = ? WHERE id =?', [name, tagline, id], (err, rows) => {
            Connection.release() //return the connection to pool
            if(!err) {
                res.send('Beer with the name: ${name} has been added.')
            } else {
                console.log(err)
            }
        })


        console.log(req.body)

    })
})


















// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))

