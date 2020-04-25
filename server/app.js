require('dotenv').config()

const express = require('express')
const graphqlHTTP =require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})