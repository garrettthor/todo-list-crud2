const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Hey, connected to ${dbName} Database.`)
        db = client.db(dbName) //The connection is STORED in the db variable!
    })
    .catch(err => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))//Anything in the /public folder can now be accessed by the server!!
app.use(express.urlencoded({ extended: true }))//This and the next line help us parse out useful data from our requests
app.use(express.json())

app.get('/', async (req, res)  => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    res.render('index.ejs', {raspberry: todoItems, left: itemsLeft})
//    db.collection('todos').find().toArray()
//    .then(data => {
//        db.collection('todos').countDocuments({ completed: false })
//        .then(itemsLeft =>{
//            res.render('index.ejs', {raspberry: data, left: itemsLeft})
//            })
//    })
})

app.post('/createTodo', (req, res) => {
    console.log(req.body.todoItem)
    db.collection('todos').insertOne({todo: req.body.todoItem, completed: false})
    .then(result => {
        console.log('A new todo object as been added.')
        res.redirect('/')
    })
})

app.put('/markComplete', (req, res) => {
    db.collection('todos').updateOne({todo: req.body.bananaStrawberry}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log(`${req.body.bananaStrawberry} has been marked complete!`)
        res.json('Marked complete json ver')
    })
})

app.put('/undo', (req, res) => {
    db.collection('todos').updateOne({todo: req.body.bananaStrawberry}, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log(`${req.body.bananaStrawberry} has been marked NOT COMPLETE!`)
        res.json('Marked NOT COMPLETE json ver')
    })
})

app.delete('/deleteTodo', (req, res) => {
    db.collection('todos').deleteOne({todo: req.body.bananaStrawberry})
    .then(result => {
        console.log(`Deleted a Todo.  It was ${req.body.bananaStrawberry}`)
        res.json('Deleted it json version')
    })
})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Server is running on port ${PORT}, you better catch it.`)
})